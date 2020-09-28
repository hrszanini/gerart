const Cep = require('../models/cep');

class Ceps{
    constructor(){
        model = Cep;
    }

    list(callback){
        Cep().list_all((results) => {
            results.map((e) => e = model().convert(e))
            callback(results);
        });
    }
}

module.exports = Ceps;