CREATE TABLE monthly_viewed_minutes (
	date varchar(30),
	category varchar(250) NOT NULL,
	original_content boolean NOT NULL,
	viewed_minutes numeric(300, 2) NOT NULL,
	PRIMARY KEY (date, category, original_content)	
);

Create Table categories (
	categoryId serial PRIMARY KEY,
	category varchar(250) NOT NULL UNIQUE
)