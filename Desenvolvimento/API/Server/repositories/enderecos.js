const Endereco = require('../models/endereco');

class Enderecos{
    list(callback){
        new Endereco().list_all(callback);
    }

    find_by_id(id, callback){
        new Endereco().find_by_id(id, callback);
    }
}

module.exports = Enderecos;