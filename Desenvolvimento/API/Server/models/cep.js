const Database = require('../implementations/database');

class Cep{
    from(object){
        let new_object = new Cep();

        new_object.get_fields().map((e) => new_object[e] = object[new_object.get_datagram()+e])

        return new_object;
    }

    find_by_id(id, callback){
        let id_field = this.get_datagram() + this.get_fields()[0];
        
        this.get_database().select(id_field, id,(results) => {
            results = results.map((e) => { return new Cep().from(e)});
            callback(results[0]);
        });
    }

    list_all(callback){
        this.get_database().list((results) => {
            results = results.map((e) => { return new Cep().from(e)});
            callback(results);
        });
    }

    add(object, callback){
        let fields = object.get_fields().map((e) => { return object.get_datagram()+e});
        let values = object.get_values();

        this.get_database().insert(fields, values, (results) => {
            if(results.length == 0){
                this.find_by_id(values[0], callback);
            }else{
                callback(results);
            }
        });
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
        return ['id', 'logradouro', 'bairro', 'cidade', 'estado'];
    }

    get_values(){
        return [this.id, this.logradouro, this.bairro, this.cidade, this.estado];
    }

    get_database(){
        return new Database('CEP_CEP');
    }
    
    get_datagram(){
        return 'cep_';
    }
}

module.exports = Cep;