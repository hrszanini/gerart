const EnderecoDao = require("../dao/endereco_dao");
const { Database } = require("../implementations/database");
const Endereco = require("../models/endereco");
const CepRepository = require("../repositories/cep_repository");

class EnderecoRepository{
    constructor(){
        let database = new Database(); 
        this.enderecoDao = new EnderecoDao(database); 
    }

    FindById(id, callback) {
        var endereco = new Endereco();
        endereco.id = id;

        this.enderecoDao.FindById(endereco, (endereco) => {
            if(endereco == null) {
                callback(null);
                return;
            }

            new CepRepository().FindById(endereco.cep, (cep) => {
                endereco.cep = cep;
                callback(endereco);
            });

        });
    }

    List(callback) {
        this.enderecoDao.FindAll(callback);
    }

    Add(endereco, callback) {
        this.enderecoDao.Add(endereco, callback);
    }
}

module.exports = EnderecoRepository;