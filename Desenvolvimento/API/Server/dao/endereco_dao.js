const Database = require('../implementations/database');
const Cep = require('./cep');

class Endereco{
    from(object){
        let new_object = new Endereco();

        new_object.get_fields().map((e) =>{if (e.indexOf('_')>0)new_object[e] = object[e]; else new_object[e] = object[new_object.get_datagram()+e] });

        return new_object;
    }

    find_by_id(id, callback){
        let id_field = this.get_datagram() + this.get_fields()[0];
        
        this.get_database().select(id_field, id,(results) => {
            results = results.map((e) => { return new Endereco().from(e)});
            callback(results[0]);
        });
    }

    list_all(callback){
        this.get_database().list((results) => {
            results = results.map((e) => { return new Endereco().from(e)});
            callback(results);
        });
    }

    add(object, callback){
        let fields = object.get_fields().map((e) => { return object.get_datagram()+e});
        let values = object.get_values();

        this.get_database().insert(fields, values, callback);
    }

    update(object, callback){
        let fields = object.get_fields().map((e) => { return object.get_datagram()+e});
        let values = object.get_values();

        this.get_database().update(object.id, fields, values, callback);
    }

    remove(object, callback){
        let id_field = this.get_values()[0] + this.get_datagram();
        this.get_database().delete(id_field, object.id, callback);
    }

    get_fields(){
        return ['id', 'nome', 'numero', 'cep_cep'];
    }

    get_values(){
        return [this.id, this.nome, this.numero];
    }

    get_database(){
        return new Database('END_ENDERECO');
    }
    
    get_datagram(){
        return 'end_';
    }
}

module.exports = Endereco;