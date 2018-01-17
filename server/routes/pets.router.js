const express = require('express');
const router = express.Router();
const pool= require('../modules/pool');



//GET routes

router.get('/', (req, res) => { // START OF GET /PETS '/' route!

    const queryText = `SELECT owners.id, owners.first_name, owners.last_name, pets.id AS pets_id, pets.pet_name, pets.breed, pets.color, pets.is_checked_in
    FROM owners
    JOIN pets ON owners.id = pets.owner_id
    ORDER BY owners.last_name, pets.is_checked_in;`
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

router.put ('/:id', (req, res) => {
    let queryText = `UPDATE pets
                     SET  is_checked_in = $1
                     WHERE id = $2`;
    pool.query(queryText, [req.body.is_checked_in, req.params.id])
    .then((results) =>{
        console.log('query update pet status results: ', results);        
        res.send(results);
    })
    .catch((err) =>{
        console.log('error making update pet status query:', err);
        res.sendStatus(500);
    });
});

router.put ('/update/:id', (req, res) => {
    let queryText = `UPDATE pets
                    SET pet_name =$1, breed =$2, color=$3
                     WHERE id = $4`;
    pool.query(queryText, [req.body.pet_name, req.body.breed, req.body.color, req.params.id])
    .then((results) =>{
        console.log('updated pet info: ', results);        
        res.send(results);
    })
    .catch((err) =>{
        console.log('error updating pet info:', err);
        res.sendStatus(500);
    });
});

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