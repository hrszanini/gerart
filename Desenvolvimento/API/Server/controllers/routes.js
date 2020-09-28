const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/cep', (req, res) => {
    const ceps = require('../repositories/ceps');
    ceps.list((items) => {
        res.send(items);
    });
});

module.exports = app; 