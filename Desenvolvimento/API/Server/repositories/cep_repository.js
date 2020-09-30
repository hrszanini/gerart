const CepDao = require("../dao/cep_dao");

class CepRepository{
    constructor(){
        this.cep_dao = new CepDao(); 
    }

    find_by_id(id, callback){
        this.cep_dao.find_by_id(id, callback);
    }

    add(cep, callback){
        this.cep_dao.add(cep, callback);
    }
}

module.exports = CepRepository;