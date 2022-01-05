const pg = require('pg');
const express = require('express');
const router = express.Router();

// "pool" represents our connection to database
const pool = new pg.Pool({
    // Name of the database
    database:   'jazzy_sql',
    host:   'localhost',
    port:   5432
});

// GET /artist endpoints
// should return an array of artist objects
// from database
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM artists;';

    pool.query(queryText)
        .then((dbRes) => {
            res.send(dbRes.rows)
        })
        .catch((err) => {
            console.log('GET /artist failed', req.body);
            
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
        req.body.artist_name,
        req.body.year_born
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