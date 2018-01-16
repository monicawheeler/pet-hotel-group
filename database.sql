
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
	check_out_date DATE,
	pet_id INT REFERENCES pets
);