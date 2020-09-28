const express = require('express');
const app = express();

const Ceps = require('../repositories/ceps');
const Enderecos = require('../repositories/enderecos');
const { consultar_cep } = require('../services/consulta_cep');

const ceps_repository = new Ceps();
const enderecos_repository = new Enderecos();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/ceps', (req, res) => {
    ceps_repository.list((items) => {
        res.send(items);
    });
});

app.get('/cep/:cep', (req, res) => {
    const cep = req.params.cep;
    consultar_cep(cep,(items) => {
        res.send(items);
    });
});

app.get('/enderecos', (req, res) => {
    enderecos_repository.list((items) => {
        res.send(items);
    });
});

app.get('/endereco/:id', (req, res) => {
    const id = req.params.id;
    enderecos_repository.find_by_id(id, (item) => {
        res.send(item);
    });
});

module.exports = app; 