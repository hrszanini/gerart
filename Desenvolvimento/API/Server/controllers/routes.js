const express = require('express');
const app = express();

const { consultar_cep } = require('../services/cep_service');


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/cep/:cep', (req, res) => {
    consultar_cep(req.params.cep, (cep) => {
        if(cep == null){
            res.status(204).send('Cep não encontrado');
        }else{
            res.send(cep);
        }
    });
});


module.exports = app; 