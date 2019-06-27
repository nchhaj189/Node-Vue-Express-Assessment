const express = require('express'); //use express.js
const app = express(); //instantiates express as an object
const routes = require('./routes'); //use the routes folder objects
const bodyParser = require('body-parser'); //take apart front end data

app.use(bodyParser.json());

app.all('/*', routes);

app.use((req, res) => res.sendStatus(404));

const request = require('request');

let server = app.listen( 8000, () => {
    console.log('Listening on port: 8000');
});

module.exports = server;