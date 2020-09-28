const Cep = require('../models/cep');

class Ceps{
    list(callback){
        new Cep().list_all(callback);
    }

    find_by_id(id, callback){
        new Cep().find_by_id(id, callback);
    }

    add(cep, callback){
        new Cep().find_by_id(cep.id, (results) => {
            if (results == null){
                new Cep().add(cep, callback);
            }else{
                callback(results);
            }
        });
    }
}

module.exports = Ceps;