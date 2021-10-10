const express = require('express');
const app = express();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const CepService = require('../services/cep_service');
const cepService = new CepService();

const EnderecoService = require('../services/endereco_service');
const enderecoService = new EnderecoService();

const ClienteService = require('../services/cliente_service.js');
const clienteService = new ClienteService();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/cep/:cep', (req, res) => {
    var cepNumber = req.params.cep
    cepService.CheckCep(cepNumber, (cep) => {
        if(cep == null){
            res.status(422).send('Cep no formato errado ou inexistente');
        }else{
            res.status(200).send(cep);
        }
    });
});

app.get('/ceps', (req, res) => {
    cepService.ListAllCeps((cepsList) => {
        res.status(200).send(cepsList);
    });
});

app.get('/endereco/:id', (req, res) => {
    let enderecoId = req.params.id;
    enderecoService.GetEndereco(enderecoId, (endereco) =>{
        if(endereco == null) {
            res.status(404).send('Endereço inexistente');
        } else {
            res.status(200).send(endereco);
        }
    });
});

app.get('/enderecos', (req, res) => {
    enderecoService.ListAllEnderecos((enderecoList) => {
        res.status(200).send(enderecoList);
    });
});

app.post('/endereco', jsonParser, (req, res) => {
    enderecoService.AddEndereco(req.body, (endereco) => {
        res.status(200).send(endereco);
    });
});

app.get('/cliente/:id', (req, res) => {
    let clienteId = req.params.id;
    clienteService.GetCliente(clienteId, (cliente) =>{
        if(cliente == null) {
            res.status(404).send('Cliente inexistente');
        } else {
            res.status(200).send(cliente);
        }
    });
});

app.get('/clientes', (req, res) => {
    clienteService.ListAllClientes((clienteList) => {
        res.status(200).send(clienteList);
    });
});

app.post('/cliente', jsonParser, (req, res) => {
    clienteService.AddCliente(req.body, (cliente) => {
        res.status(200).send(cliente);
    });
});

app.put('/cliente', jsonParser, (req, res) => {
    clienteService.SetCliente(req.body, (cliente) => {
        res.status(200).send(cliente);
    });
});


module.exports = app; 