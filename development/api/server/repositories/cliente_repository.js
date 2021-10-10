const ClienteDao = require("../dao/cliente_dao");
const { Database } = require("../implementations/database");
const Cliente = require("../models/cliente");
const EnderecoRepository = require("./endereco_repository");

class ClienteRepository{
    constructor(){
        let database = new Database(); 
        this.clienteDao = new ClienteDao(database); 
    }

    FindById(id, callback) {
        var cliente = new Cliente();
        cliente.id = id;

        this.clienteDao.FindById(cliente, (cliente) => {
            if(cliente == null) {
                callback(null);
                return;
            }

            new EnderecoRepository().FindById(cliente.endereco, (endereco) => {
                cliente.endereco = endereco;
                callback(cliente);
            });

        });
    }

    List(callback) {
        this.clienteDao.FindAll(callback);
    }

    Add(cliente, callback) {
        this.clienteDao.Add(cliente, callback);
    }

    Update(cliente, callback) {
        this.clienteDao.Update(cliente, callback);
    }
}

module.exports = ClienteRepository;