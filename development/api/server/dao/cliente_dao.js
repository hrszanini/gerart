const { Clause, FieldDict, Table } = require('../implementations/database');
const Cliente = require('../models/cliente');

class ClienteDao{
    constructor(database){
        this.table = new Table('PSA_PESSOA', database);
    }

    FindById(pessoa, callback){
        var clauses = [new Clause('psa_id', '=', pessoa.id)];

        this.table.Select(null, clauses, (result) => {
            if(result.length > 0) {
                callback(this.FromDatabaseObject(result[0]));
            } else {
                callback(null);  
            }
        });
    }

    FindAll(callback) {
        this.table.Select(null, null, (dbClientes) => {
            let clientes = dbClientes.map((e) => this.FromDatabaseObject(e));
            callback(clientes);
        });
    }

    Add(cliente, callback) {
        let fieldsDict = this.DatabaseFieldDict(cliente);
        this.table.Insert(fieldsDict, () => { callback(cliente) });
    }

    Update(cliente, callback) {
        var clauses = [new Clause('psa_id', '=', cliente.id)];
        var fieldsDict = this.DatabaseFieldDict(cliente);
        this.table.Update(fieldsDict, clauses, callback);
    }

    Delete(cliente, callback) {
        var clauses = [ new Clause('psa_id', '=', cliente.id) ];
        this.table.Delete(clauses, callback);
    }

    FromDatabaseObject(object){
        var cliente = new Cliente();
        cliente.id = object.psa_id;
        cliente.nome = object.psa_nome;
        cliente.endereco = object.end_id;
        cliente.email = object.psa_email;
        cliente.telefone = object.psa_telefone;
        cliente.poderAquisitivo = object.psa_poder_aquisitivo

        return cliente;
    }

    DatabaseFieldDict(cliente){
        var clienteDB = [];
        clienteDB.push(new FieldDict('psa_nome', cliente.nome))
        clienteDB.push(new FieldDict('end_id', cliente.endereco))
        clienteDB.push(new FieldDict('psa_email', cliente.email))
        clienteDB.push(new FieldDict('psa_telefone', cliente.telefone))
        clienteDB.push(new FieldDict('psa_poder_aquisitivo', cliente.poderAquisitivo))
       
        return clienteDB.filter((e) => { return e.value != undefined });
    }
}

module.exports = ClienteDao;