const Ceps = require('../repositories/ceps');
const http = require('http');
const Cep = require('../models/cep');

function consultar_cep(cep_num, callback){

    if(cep_num.length > 8){
        callback('Verificar tamanho do CEP inserido');
        return null;
    }

    var options = {
        host: `viacep.com.br`,
        path: `/ws/${cep_num}/json`
    };

    http.request(options, (response) => {
        var data = '';

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            if(data.indexOf('erro') < 0){
                data = JSON.parse(data);
                cep = new Cep();
                cep.id = cep_num;
                cep.logradouro = data.logradouro;
                cep.bairro = data.bairro;
                cep.cidade = data.localidade;
                cep.estado = data.uf;
                new Ceps().add(cep, callback);
            }else{
                callback('CEP não encontrado.');
            }
        });
    }).end();
}

exports.consultar_cep = consultar_cep;