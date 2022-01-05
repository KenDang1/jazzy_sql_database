const pg = require('pg');
const express = require('express');
const router = express.Router();


const pool = new pg.Pool({
    database:   'jazzy_sql',
    host:   'localhost',
    port:   5432
})

router.get('/', (req, res) => {
    const queryText = `
    SELECT title, length, to_char(released, 'Mon FMDDth YYYY') AS "released"
    FROM songs
    ORDER BY UPPER(title) ASC;
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
    INSERT INTO "songs"
	    ("title", "length", "released")
    VALUES
        -- These are called "placeholders"
        ($1, $2, $3)
    `;
    // Define actual values for placeholder
    let queryParams = [
        req.body.title,
        req.body.length,
        req.body.released
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
});





module.exports = router;