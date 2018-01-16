const express = require('express');
const router = express.Router();
const pool= require('../modules/pool');



//GET routes

router.get('/', (req, res) => { // START OF GET /PETS '/' route!

    const queryText = `SELECT owners.id, owners.first_name, owners.last_name, pets.id AS pets_id, pets.pet_name, pets.breed, pets.color, pets.is_checked_in
    FROM owners
    JOIN pets ON owners.id = pets.owner_id;`
    pool.query(queryText) // START OF FIRST GET QUERY
        // runs on successful query
        .then((result) => {
            console.log('"/" Results of first GET query for pets: ', result.rows); 
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making "/" GET for pets: ', err);
            res.sendStatus(500);
        }); // END OF FIRST GET QUERY

}); // END OF GET /PETS '/' Tasks route!

//POST routes


//PUT routes


//DELETE routes


module.exports = router;