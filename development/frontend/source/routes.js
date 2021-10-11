const express = require('express');
const app = express();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.redirect('/page/index.html');
});

app.get('/page/:page', (req, res) => {
    res.sendFile(`${__dirname}/page/${req.params.page}`);
});

app.get('/script/:script', (req, res) => {
    res.sendFile(`${__dirname}/script/${req.params.script}`);
});

app.get('/style/:style', (req, res) => {
    res.sendFile(`${__dirname}/style/${req.params.style}`);
});

module.exports = app;