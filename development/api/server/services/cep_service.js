const Cep = require('../models/cep');
const CepRepository = require('../repositories/cep_repository');
const http = require('http');

class CepService {
    constructor(){
        this.cepRepository = new CepRepository();
    }

    CheckCep(cepNumber, callback){
        let regex = /^[0-9]{8}$/;

        if(regex.test(cepNumber)){
            this.cepRepository.FindById(cepNumber, (cep) => {

                if(cep == null)
                    this.CheckOnlineCep(cepNumber, callback);
                else
                    callback(cep);
                
            });

        } else {
            callback(null);
        }
    }
    
    CheckOnlineCep(cepNumber, callback){
        var options = {
            host: `viacep.com.br`,
            path: `/ws/${cepNumber}/json`
        };
    
        http.request(options, (response) => {
            var dataBuffer = '';
    
            response.on('data',(chunk) => {
                dataBuffer += chunk;
            });
    
            response.on('end', () => {
                if(dataBuffer.indexOf('erro') < 0){
                    let data = JSON.parse(dataBuffer);
    
                    let cep = new Cep();
                    cep.cep = cepNumber;
                    cep.logradouro = data.logradouro;
                    cep.bairro = data.bairro;
                    cep.cidade = data.localidade;
                    cep.estado = data.uf;

                    this.cepRepository.Add(cep, callback);
                } else {
                    callback(null);
                }
            });

        }).end();
    }

    ListAllCeps(callback){
        this.cepRepository.List(callback);
    }
}


module.exports = CepService;