const express = require('express'); //use express.js
const app = express(); //instantiates express as an object
const routes = require('./routes'); //use the routes folder objects
const bodyParser = require('body-parser'); //take apart front end data
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.all('/*', routes);

app.use((req, res) => res.sendStatus(404));

let server = app.listen( 3000, () => {
    console.log('Listening on port: 3000');
});

module.exports = server;