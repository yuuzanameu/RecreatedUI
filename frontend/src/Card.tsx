import styles from './css/Card.module.css';

import {GlobalContext, CardFields} from './GlobalContext'
import { useContext } from 'react';


const CardSection: React.FC = () => {
    const { cards, deleteCard} = useContext(GlobalContext);

    const handleDelete = async (id: string, status: string) => {

        deleteCard(id);
        try {
            const response = await fetch('http://project.editnow.site/api/delete/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id: id, 
                    placed: status === 'Placed' ? -1 : 0,
                    unplaced: status === 'Unplaced' ? -1 : 0,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Frontend: Success: deleted card', result);

        } catch (error) {
            console.error('Frontend: Error deleting card:', error);
        }
    };


    return (
        <>
            <div className={styles.cardGrid}>
                {
                    cards.map((card, _) => (
                        <Card key={card.id} {...card} onDelete = {() => handleDelete(card.id, card.status)}                          
                        />
                    ))
                }
                </div>
        </>
    )
}

const Value : React.FC<{value: string}> =({value}) => {
    return (
        <p className={styles.value}>
            {value}
        </p>
    )
}


type CardProps = CardFields & {
    onDelete: () => void; 
};


const Card: React.FC<CardProps> = ({
    name = '',
    role = '',
    email = '',
    phone= '',
    course = '',
    status = 'Unplaced',
    onDelete = () => {}
}) => {

    const firstLetter = name.charAt(0).toLowerCase();

    return (
        <div className={styles.card}>
            <div className={styles.namestyle}>
                <div className={styles.avatar}>
                    {firstLetter}
                </div>
                <p className={styles.name}>{name}</p>
            </div>

            <div className={styles.details}>
                <div className={styles.field}>
                    <span className={styles.label}>Role:</span> <Value value={role}/>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Email:</span> <Value value = {email}/>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Phone Number:</span> <Value value = {phone}/>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Course:</span> <Value  value ={course}/>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Status:</span> <Value value = {status}/>
                </div>
            </div>

            <button className={styles.deleteButton} onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

export default CardSection;
