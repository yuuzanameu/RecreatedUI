import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'userdata',
    password: 'dummy',
    port: 5432,
});

const app = express();

app.use(cors());
app.use(express.json())

const port = 3000;

app.get('/test', (_, res) => {
    res.json({ message: 'Hello, world!' });
})

app.get('/stats', async (_, res) => {
    console.log('hello from get request');
    try {
        const query = 'SELECT placed, unplaced, total FROM submissions where id = $1';

        const result = await pool.query(query, [1]);

        if (result.rows.length > 0) {
            res.json({
                placed: result.rows[0].placed,
                unplaced: result.rows[0].unplaced,
                total: result.rows[0].total
            });
            return;
        }   
        else {
            throw new Error('couldnt fetch data from db: check if its empty or wrong query');
        }
    } catch (error) {
        console.error('some error on /stats:', error);
        res.status(500).json({statsError: error})
    }
});

async function modifySubmissions(newPlaced: number, newUnplaced: number){
        const getCurrentValues = 'SELECT placed, unplaced, total FROM submissions LIMIT 1';
        const currentResult = await pool.query(getCurrentValues);

        let existingValues = {
            placed: 0,
            unplaced: 0,
            total: 0
        };

        if (currentResult.rows.length > 0) {
            existingValues = currentResult.rows[0];
        }

        const updatedValues = {
            placed: existingValues.placed + newPlaced,
            unplaced: existingValues.unplaced + newUnplaced,
            total: existingValues.placed + existingValues.unplaced + newPlaced + newUnplaced
        };

        const updateQuery = `
            UPDATE submissions 
            SET placed = $1, unplaced = $2, total = $3 
            WHERE ctid = (SELECT ctid FROM submissions LIMIT 1)
            RETURNING *
        `;

        const updateResult = await pool.query(updateQuery, [
            updatedValues.placed,
            updatedValues.unplaced,
            updatedValues.total
        ]);

        if (updateResult.rowCount === 0) {
            const insertQuery = `
                INSERT INTO submissions (placed, unplaced, total)
                VALUES ($1, $2, $3)
                RETURNING *
            `;

            const insertResult = await pool.query(insertQuery, [
                updatedValues.placed,
                updatedValues.unplaced,
                updatedValues.total
            ]);

            return insertResult.rows[0];
        }

        return updateResult.rows[0];
}

app.post('/submit/add', async (req, res) => {
    try {
        const { placed: newPlaced, unplaced: newUnplaced } = req.body;

        const modified = await modifySubmissions(newPlaced, newUnplaced);
        res.json(modified)
    } 
    catch (error) {
        console.error('Database operation error on /submit/add:', error);
        res.status(500).json({submitAddError: error});
    }
});


app.get('/cards', async (_, res) => {
    try {
        const responseFromCardDb = await pool.query(`
            SELECT id, name, role, email, phone, course, status
            FROM cards
            ORDER BY position;`
        );

        res.json(responseFromCardDb.rows);
    }
    catch (error){
        console.log('Error happened on /cards', error);
        res.status(500).json({cardsError: error})
    }

})


app.post('/add/cards', async (req, res) => {
    try {
        const {id, name, role, email, phone, course, status} = req.body;
        const responseForAddCard = await pool.query(`
            INSERT INTO cards (id, name, role, email, phone, course, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `, [id, name, role, email, phone, course, status]);

        if (responseForAddCard.rows.length > 0) {
            res.json({message: `succesfully added new card: ${responseForAddCard.rows[0].id}` })
        }
        else {
            throw new Error(`couldnt add card id: ${id}`)
        }
    }
    catch (error){
        console.log('Error happened on /add/cards', error);
        res.status(500).json({addCardError: error})
    }
})


app.post('/delete/cards', async (req, res) => {
    try {
        const {id, placed, unplaced} = req.body;

        await pool.query('BEGIN');

        await modifySubmissions(placed, unplaced);

        const { rows: [deletedCard] } = await pool.query(
            'SELECT position FROM cards WHERE id = $1',
            [id]
        );

        const deleteResponse = await pool.query(
            'DELETE FROM cards WHERE id = $1 RETURNING id',
            [id]
        );

        await pool.query(` 
            UPDATE cards
            SET position = position - 1
            WHERE position > $1
            `, [deletedCard.position]
        );

        await pool.query('COMMIT');

        if (deleteResponse.rows.length > 0){
            res.json({message: `succesfully deleted card id: ${deleteResponse.rows[0].id}`})
        }
        else {
            throw new Error('Error happened on /delete/cards and im throwing');
        }
    }
    catch (error){
        await pool.query('ROLLBACK');
        console.log('Error happened on /delete/cards', error);
        res.status(500).json({deleteCardError: error})
    }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
