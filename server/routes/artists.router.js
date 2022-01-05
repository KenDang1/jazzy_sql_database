const pg = require('pg');
const express = require('express');
const router = express.Router();

const artistList = [ 
    {
        name: 'Ella Fitzgerald',
        birthdate: '04-25-1917'
    },
    {
        name: 'Dave Brubeck',
        birthdate: '12-06-1920'
    },       
    {
        name: 'Miles Davis',
        birthdate: '05-26-1926'
    },
    {
        name: 'Esperanza Spalding',
        birthdate: '10-18-1984'
    },
] 


// "pool" represents our connection to database
const pool = new pg.Pool({
    // Name of the database
    database:   'jazzy_sql'
});

// GET /artist endpoints
// should return an array of artist objects
// from database
router.get('/', (req, res) => {
    const queryText = `
    SELECT name, birthday
    FROM artists
    ORDER BY birthday DESC;
    `;

    pool.query(queryText)
        .then((dbRes) => {
            console.log('dbRes', dbRes.rows);
            res.send(dbRes.rows)
        })
        .catch((err) => {
            console.log('GET /artist failed', err);
            
            // Tell the clients it failed
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('req.body is', req.body);

    let queryText = `
    INSERT INTO "artists"
	    ("artist_name", "year_born")
    VALUES
        -- These are called "placeholders"
        ($1, $2)
    `;
    // Define actual values for placeholder
    let queryParams = [
        req.body.name,
        req.body.birthday
    ]
    console.log('queryText is', queryText);
    
    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST failed', err);
            res.sendStatus(500);
        })
})

module.exports = router;