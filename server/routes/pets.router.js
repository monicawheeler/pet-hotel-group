const express = require('express');
const router = express.Router();
const pool= require('../modules/pool');



//GET routes


//POST routes


//PUT routes


//DELETE routes
router.delete ('/:id', (req, res) => {
    let queryText = `DELETE FROM pets WHERE id = $1`;
    pool.query(queryText, [req.params.id])
    .then((results) =>{
        console.log('query delete results: ', results);        
        res.send(results);
    })
    .catch((err) =>{
        console.log('error making delete query:', err);
        res.sendStatus(500);
    });
});

module.exports = router;