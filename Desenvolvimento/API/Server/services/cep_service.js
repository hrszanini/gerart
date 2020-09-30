const Cep = require('../models/cep');
const CepRepository = require('../repositories/cep_repository');
const http = require('http');

class CepService{
    constructor(){
        this.cep_repository = new CepRepository();
    }

    consultar_cep(numero_cep, callback){
        if(numero_cep.length != 8){
            callback(null);
        }
    
        cep_repository.find_by_id(numero_cep, (cep) => {
            if(cep.id == null){
                consultar_cep_online(cep, callback);
            }else{
                callback(cep);
            }
        });
    }
    
    consultar_cep_online(numero_cep, callback){
        var options = {
            host: `viacep.com.br`,
            path: `/ws/${numero_cep}/json`
        };
    
        http.request(options, (response) => {
            var data = '';
    
            response.on('data',(chunk) => {
                data += chunk;
            });
    
            response.on('end', () => {
                if(data.indexOf('erro') < 0){
                    data = JSON.parse(data);
    
                    cep = new Cep();
                    cep.id = numero_cep;
                    cep.logradouro = data.logradouro;
                    cep.bairro = data.bairro;
                    cep.cidade = data.localidade;
                    cep.estado = data.uf;
    
                    cep_repository.add(cep, callback);
                }else{
                    callback(null);
                }
            });
        }).end();
    }
}

module.exports = CepService;