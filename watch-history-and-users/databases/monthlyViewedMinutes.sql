CREATE TABLE monthly_viewed_minutes (
	date varchar(10) PRIMARY KEY,
	category varchar(250) NOT NULL,
	original_content boolean NOT NULL,
	viewed_minutes numeric(300, 2) not null
);