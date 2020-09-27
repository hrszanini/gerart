const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/ola', (req, res) => {
    res.send('Eaeee');
});

module.exports = app; 