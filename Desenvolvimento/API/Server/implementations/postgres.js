const Query = require('pg').Query;
const { Client } = require('pg');

function configure(configuration){
    const client = new Client({
        host : configuration.host,
        port: configuration.port,
        user : configuration.user,
        password: configuration.password,
        database: configuration.database
    });

    return client;
}

function execute_query(client, query, callback){
    client().connect(err => {
        if (err) {
          console.error('Erro ao conectar ao banco de dados.', err.stack)
        } else {
            client.query(query, (err, res) => {
                if (err) throw err
                callback(res.rows);
                client.end();
            });
        }
    })
}

function select_sql(client, table, field, value, callback){
    query = new Query('SELECT * FROM $1 WHERE $2 = $3;', [table, field, value]);
    execute_query(client, query, callback);
}

function select_all_sql(client, table, callback){
    query = new Query('SELECT * FROM $1;', [table]);
    execute_query(client, query, callback);
}

function insert_sql(client, table, fields, values, callback){
    fields_str = fields.reduce(this.insert_params_reducer);
    values_str = values.reduce(this.insert_params_reducer);

    query = new Query('INSERT INTO $1($2) VALUES($3);', [table, fields_str, values_str]);
    execute_query(client, query, callback);
}

function update_sql(client, table, id, fields, values, callback){
    var id_field = table.split('_')[0] + 'id';

    var field_values = update_params_reducer(fields, values);

    query = new Query('UPDATE $1 SET $2 WHERE $4 = $5;', [table, fields_values, id_field, id]);
    execute_query(client, query, callback);
}

function delete_sql(client, table, field, value, callback){
    query = new Query('DELETE FROM $1 WHERE $2 = $3;', [table, field, value]);
    execute_query(client, query, callback);
}

function insert_params_reducer(string, element){
    if(string != ''){
        string += ',';
    }
    string += element;
}

function update_params_reducer(fields, values){
    var ret = '';
    for (pos in fields){
        if (ret != '') ret += ',';

        ret += fields[pos] + ' = ' + values[pos];
    }
    return ret;
}
