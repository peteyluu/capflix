CREATE TABLE users (
	id SERIAL,
	email varchar(100) NOT NULL UNIQUE,
	password varchar(50) NOT NULL,
	geolocation json NOT NULL,
	PRIMARY KEY (id, email)
);

CREATE TABLE tmp (
	id SERIAL,
	email varchar(100) NOT NULL,
	password varchar(50) NOT NULL,
	geolocation json NOT NULL,
	PRIMARY KEY (id, email)
);