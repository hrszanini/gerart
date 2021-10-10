const { Driver } = require('./postgres');
const { read_file } = require('../utils');

class Database {
    constructor(){
        this.configuration = {
            user : process.env.DB_USER,
            host : process.env.DB_HOST,
            database : process.env.DB_DATABASE,
            password : process.env.DB_PASSWORD,
            port : process.env.DB_PORT
        };

        this.driver = new Driver(this.configuration);
    }

    Initialization(){
        read_file(process.env.DB_SQL_INIT,(sql) => {
            var query = {
                text: sql,
                values: []
            }
            this.driver.Execute(query, () => console.log('Database initialized'));
        });
    }
}

class Clause {
    constructor(field, comparator, value){
        this.field = field;
        this.comparator = comparator;
        this.value = value;
    }
}

class FieldDict {
    constructor(field, value){
        this.field = field;
        this.value = value;
    }
}

class Table {
    constructor(table, database){
        this.table = table;
        this.database = database;
    }

    Select(fields, clauses, callback){
        this.database.driver.Select(this.table, fields, clauses, callback);
    }

    Insert(fieldsDicts, callback){
        this.database.driver.Insert(this.table, fieldsDicts, callback);
    }

    Update(fieldsDicts, clauses, callback){
        this.database.driver.Update(this.table, fieldsDicts, clauses, callback);
    }

    Delete(clauses, callback){
        this.database.driver.Delete(this.table, clauses, callback);
    }
}

module.exports.Database = Database;
module.exports.Clause = Clause;
module.exports.FieldDict = FieldDict;
module.exports.Table = Table;