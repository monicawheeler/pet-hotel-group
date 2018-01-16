const express = require('express');
const router = express.Router();
const pool= require('../modules/pool');



//GET routes


//POST routes
router.post('/', (req,res) => {
   
    const queryText = 'INSERT INTO pets (pet_name, breed, color, owner_id) VALUES ($1, $2, $3, $4)';
    pool.query(queryText, [req.body.pet_name, req.body.breed, req.body.color, req.body.owner_id])
        .then((result) => {
            console.log('registed new pet');
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Oh no!', err);
            res.sendStatus(500);
        })

});
//PUT routes


//DELETE routes


module.exports = router;