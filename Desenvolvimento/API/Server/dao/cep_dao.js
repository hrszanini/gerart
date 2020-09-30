const Cep = require('../models/cep');
const Database = require('../implementations/database');

class CepDao{
    constructor(){
        this.database = new Database('CEP_CEP');
    }

    from(object){
        var cep = new Cep();

        cep.cep = object.cep_cep;
        cep.rua = object.cep_rua;
        cep.bairro = object.cep_bairro;
        cep.cidade = object.cep_cidade;
        cep.estado = object.cep_estado;

        return cep;
    }

    find_by_id(id, callback){
        this.database.select('cep_cep', id, (result) =>{
            if(object != null){
                var cep = this.from(result[0]);
            }else{
                var cep = new Cep();
            }
            callback(cep);
        });
    }

    add(cep, callback){
        this.find_by_id(cep.cep, (cep_result) =>{
            if(cep_result.id == null){
                var fields = this.get_fields(cep).map((e) => e = e.field);
                var values = this.get_fields(cep).map((e) => e = e.values);
                this.database.insert(fields, values, callback);
            }else{
                callback(cep_result);
            }  
        });
    }

    list_id(callback){
        this.database.list((result) => {
            cep_list = [];
            result.map((e) => cep_list.push(e.cep_cep));
            callback(cep_list);
        });
    }

    get_fields(cep){
        return [
            {
                field: 'cep_cep',
                value: cep.cep
            },{
                field: 'cep_rua', 
                value: cep.rua
            },{
                field: 'cep_bairro',
                value: cep.bairro,
            },{
                field: 'cep_cidade',
                value: cep.cidade
            },{
                field: 'cep_estado',
                value: cep.estado
            }
        ];
    }
}

module.exports = CepDao;