const { Clause, FieldDict, Table } = require('../implementations/database');
const Endereco = require('../models/endereco');

class EnderecoDao{
    constructor(Database) {
        this.table = new Table('END_ENDERECO', Database);
    }

    FindById(endereco, callback) {
        var clauses = [new Clause('end_id', '=', endereco.id)];

        this.table.Select(null, clauses, (result) => {
            if(result.length > 0) {
                callback(this.FromDatabaseObject(result[0]));
            } else {
                callback(null);  
            }
        });
    }

    FindAll(callback) {
        this.table.Select(null, null, (dbEnderecos) => {
            let enderecos = dbEnderecos.map((e) => this.FromDatabaseObject(e));
            callback(enderecos);
        });
    }

    Add(endereco, callback) {
        let fieldsDict = this.DatabaseFieldDict(endereco);
        this.table.Insert(fieldsDict, callback);
    }

    Update(endereco, callback) {
        var clauses = [new Clause('end_id', '=', endereco.id)];
        var fieldsDict = this.DatabaseFieldDict(endereco);
        this.table.Update(fieldsDict,clauses, callback);
    }

    Delete(endereco, callback) {
        var clauses = [ new Clause('end_id', '=', endereco.id) ];
        this.table.Delete(clauses, callback);
    }

    FromDatabaseObject(object){
        var endereco = new Endereco();
        endereco.id = object.end_id;
        endereco.nome = object.end_nome;
        endereco.numero = object.end_numero;
        endereco.cep = object.cep_id;

        return endereco;
    }

    DatabaseFieldDict(endereco){
        var enderecoDB = [];
        enderecoDB.push(new FieldDict('end_nome', endereco.nome));
        enderecoDB.push(new FieldDict('end_numero', endereco.numero));
        enderecoDB.push(new FieldDict('cep_id', endereco.cep));
        
        return enderecoDB;
    }
}

module.exports = EnderecoDao;