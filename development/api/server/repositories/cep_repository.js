const CepDao = require("../dao/cep_dao");
const { Database } = require("../implementations/database");
const Cep = require("../models/cep");

class CepRepository{
    constructor(){
        let database = new Database(); 
        this.cepDao = new CepDao(database); 
    }

    FindById(id, callback) {
        var cep = new Cep();
        cep.id = id;

        this.cepDao.FindById(cep, callback);
    }

    List(callback) {
        this.cepDao.FindAll(callback);
    }

    Add(cep, callback) {
        this.cepDao.Add(cep, callback);
    }
}

module.exports = CepRepository;