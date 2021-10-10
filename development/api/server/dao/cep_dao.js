const { Clause, FieldDict, Table } = require('../implementations/database');
const Cep = require('../models/cep');

class CepDao{
    constructor(database){
        this.table = new Table('CEP_CEP', database);
    }

    FindById(cep, callback){
        var clauses = [new Clause('cep_id', '=', cep.id)];

        this.table.Select(null, clauses, (result) => {
            if(result.length > 0) {
                callback(this.FromDatabaseObject(result[0]));
            } else {
                callback(null);  
            }
        });
    }

    FindAll(callback) {
        this.table.Select(null, null, (dbCeps) => {
            let ceps = dbCeps.map((e) => this.FromDatabaseObject(e));
            callback(ceps);
        });
    }

    Add(cep, callback) {
        let fieldsDict = this.DatabaseFieldDict(cep);
        this.table.Insert(fieldsDict, () => { callback(cep) });
    }

    Update(cep, callback) {
        var clauses = [new Clause('cep_id', '=', cep.id)];
        var fieldsDict = this.DatabaseFieldDict(cep);
        this.table.Update(fieldsDict,clauses, callback);
    }

    Delete(cep, callback) {
        var clauses = [ new Clause('cep_id', '=', cep.id) ];
        this.table.Delete(clauses, callback);
    }

    FromDatabaseObject(object){
        var cep = new Cep();
        cep.id = object.cep_id;
        cep.logradouro = object.cep_logradouro;
        cep.bairro = object.cep_bairro;
        cep.cidade = object.cep_cidade;
        cep.estado = object.cep_estado;

        return cep;
    }

    DatabaseFieldDict(cep){
        var cepDB = [];
        cepDB.push(new FieldDict('cep_id', cep.cep))
        cepDB.push(new FieldDict('cep_logradouro', cep.logradouro))
        cepDB.push(new FieldDict('cep_bairro', cep.bairro))
        cepDB.push(new FieldDict('cep_cidade', cep.cidade))
        cepDB.push(new FieldDict('cep_estado', cep.estado))
        return cepDB;
    }
}

module.exports = CepDao;