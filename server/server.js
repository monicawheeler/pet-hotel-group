// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const petsRouter = require('./routes/pets.router');
const ownersRouter = require('./routes/owners.router')
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

// routes
// To Pet router
app.use('/pets', petsRouter);
// To Owners router
app.use('/owners', ownersRouter);


// Port Listener
const port = 5000;
app.listen(port, ()=> console.log(`Server up on port: ${port}`));