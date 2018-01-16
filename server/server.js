// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

// routes


// Port Listener
const port = 5000;
app.listen(port, ()=> console.log(`Server up on port: ${port}`));