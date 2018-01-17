
--Tables--

CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(80) NOT NULL
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    pet_name VARCHAR(80) NOT NULL,
    breed VARCHAR(80) NOT NULL,
    color VARCHAR(80) NOT NULL,
    is_checked_in BOOLEAN DEFAULT false,
    owner_id INT REFERENCES owners  
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    check_in_date DATE DEFAULT now(),
    check_out_date DATE DEFAULT NULL,
    pet_id INT REFERENCES pets
);

--Database data--

INSERT INTO owners (first_name, last_name) 
VALUES ('Darian', 'Nas'), ('Monica', 'Wheeler'), ('Paul', 'Tiller'), ('Philip', 'Owen');

INSERT INTO pets (pet_name, color, breed, owner_id)
VALUES ('Yuki', 'white', 'ferret', 1), ('Bodhi', 'white', 'golden retriever', 2), ('Millie', 'brown', 'mutt', 3), ('Halsey', 'gray', 'australian shepherd', 4);

INSERT INTO visits (check_in_date, check_out_date, pet_id)
VALUES ('2018-01-17','2018-10-10',1), ('2018-10-11', NULL,1), ('2018-01-15','2018-01-16',2), ('2018-01-17', NULL,2), ('2018-01-17','2018-10-10',3), ('2018-01-17', NULL,3),('2018-01-17','2018-10-10',4);

