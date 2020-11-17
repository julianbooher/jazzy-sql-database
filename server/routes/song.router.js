const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    console.log(`In /song GET`);

    let queryText = `SELECT * FROM "songs";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET /songs ${error}`);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('In /song POST with', req.body);

    const songToAdd = req.body;
    const queryText = `INSERT INTO "songs"
    (title, length, date_released)
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [songToAdd.title, songToAdd.length, songToAdd.date_released])
        .then((responseFromDatabase) => {
            console.log(responseFromDatabase);
            res.sendStatus(201);
        }).catch((error) => {
            console.log(`Error in POST /song ${error}`);
            res.sendStatus(500);
        })
});

module.exports = router;