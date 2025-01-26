CREATE TABLE cards (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT '',        
    role VARCHAR(255) NOT NULL DEFAULT '',        
    email VARCHAR(255) NOT NULL DEFAULT '',       
    phone VARCHAR(255) NOT NULL DEFAULT '',       
    course VARCHAR(255) NOT NULL DEFAULT '',      
    status VARCHAR(255) NOT NULL DEFAULT '',      
    position SERIAL                               
);

INSERT INTO cards (id, name, role, email, phone, course, status)
VALUES ('ebb3e369-f72b-48d4-8037-54f4f38d23dd', 'John Dosasa', 'Developer', 'john@example.com', '123-456-7890', 'React Basics', 'Placed');


DELETE FROM cards WHERE id = 'dbe7ba0f-82b9-4fa9-b53f-b693277a89a5' RETURNING id;

UPDATE cards SET position = position - 1 WHERE position > $1

SELECT * FROM cards ORDER BY position;
