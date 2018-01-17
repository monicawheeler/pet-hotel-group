const express = require('express');
const router = express.Router();
const pool= require('../modules/pool');



//GET routes
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM owners';
    pool.query(queryText)
        .then((result) => {
            console.log('results: ', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error:', err);
            res.sendStatus(500);
        })
});

//POST routes
router.post('/', (req, res) => {
    const queryText = `INSERT INTO owners (first_name, last_name) VALUES($1, $2)`;
    pool.query(queryText,[req.body.first_name, req.body.last_name])
    // runs on success
    .then((result) => {
        res.sendStatus(201);
    })
    // error handling
    .catch((err) => {
        res.sendStatus(500);
    });
});

//PUT routes


//DELETE routes


module.exports = router;