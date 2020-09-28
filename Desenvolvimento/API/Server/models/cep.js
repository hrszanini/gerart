Database = require('../implementations/database');

class Cep{
    constructor(){
        this.db = Database('CEP_CEP');
    }

    convert(object){
        cep_instance = Cep();
        cep_instance.set(object);
        return cep_instance;
    }

    set(object){
        object.cep_id = this.cep_id;
        object.cep_logradouro = this.logradouro;
        object.cep_bairro = this.bairro;
        object.cep_cidade = this.cidade;
        object_estado = this.estado;
    }

    find_by_id(cep, callback){
        this.db.select('cep_id', cep.id, callback);
    }

    list_all(callback){
        this.db.list(callback);
    }

    add(cep, callback){
        var fields = cep.get_fields();
        var values = cep.get_values();

        fields.push('cep_id');
        values.push(this.id);

        this.db.insert(fields, values, callback);
    }

    update(cep, callback){
        this.db.update(cep.id, cep.get_fields(), cep.get_values(), callback);
    }

    remove(cep, callback){
        this.db.delete('cep_id', cep.id, callback);
    }

    get_fields(){
        return ['cep_logradouro', 'cep_bairro', 'cep_cidade', 'cep_estado'];
    }

    get_values(){
        return [this.id, this.logradouro, this.bairro, this.cidade, this.estado];
    }
}

module.exports = Cep;