CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(80) not null,
    "birthday" date
);

INSERT INTO "artists"
	("name", "birthday")
VALUES
	('Ella Fitzgerald', '04-25-1917'),
	('Dave Brubeck', '12-06-1920'),
	('Miles Davis', '05-26-1926'),
	('Esperanza Spalding', '10-18-1984');