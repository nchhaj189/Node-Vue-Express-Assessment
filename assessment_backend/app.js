const express = require('express'); //use express.js
const app = express(); //instantiates express as an object
const routes = require('./routes'); //use the routes folder objects
const bodyParser = require('body-parser'); //take apart front end data
const cors = require('cors');
const auth = require('./middleware/auth.js');
const check = require('./routes/check');

app.use(bodyParser.json());
app.use(cors());

app.get('/check', check)
app.all('/*', auth, routes);

app.use((req, res) => res.sendStatus(404));

let server = app.listen( 3000, () => {
    console.log('Listening on port: 3000');
});

module.exports = server;