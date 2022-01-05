CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "artist_name" varchar(80) not null,
    "year_born" date
);

INSERT INTO "artists"
	("artist_name", "year_born")
VALUES
	('Ella Fitzgerald', '04-25-1917'),
	('Dave Brubeck', '12-06-1920'),
	('Miles Davis', '05-26-1926'),
	('Esperanza Spalding', '10-18-1984');