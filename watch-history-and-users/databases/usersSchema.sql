CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email varchar(100) NOT NULL,
	password varchar(50) NOT NULL,
	geolocation json NOT NULL
);