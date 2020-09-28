function execute_query(configuration, query, callback){
    const { Client } = require('pg');

    const client = new Client({
        host : configuration.host,
        port: configuration.port,
        user : configuration.user,
        password: configuration.password,
        database: configuration.database
    });

    client.connect(err => {
        if (err) {
          console.error('Erro ao conectar ao banco de dados.', err.stack)
        } else {
            client.query(query.text, query.values, (err, res) => {
                if (err) throw err
                callback(res.rows);
                client.end();
            });
        }
    });
}

function select_sql(configuration, table, field, value, callback){
    var query = {
        text: `SELECT * FROM  ${table} WHERE ${field} = $1`,
        values: [value],
    };
    execute_query(configuration, query, callback);
}


function select_all_sql(configuration, table, callback){
    var query = {
        text: `SELECT * FROM ${table}`,
        values: [],
    };
    execute_query(configuration, query, callback);
}


function insert_sql(configuration, table, fields, values, callback){
    let fields_str = '';
    fields_str = fields.reduce((str, field) =>{
        if (str != ''){
            str += ','
        };
        return `${str} ${field}`;
    });

    let values_str = '';
    for (pos in values){
        var param = 1 + parseInt(pos);
        if(param > 1){
            values_str += `, `;
        }
        values_str += `$${param}`;
    }

    var query = {
        text: `INSERT INTO  ${table}(${fields_str}) VALUES (${values_str})`,
        values: values,
    };
    execute_query(configuration, query, callback);
}

function update_sql(configuration, table, id, fields, values, callback){
    let id_field = table.split('_')[0] + '_id';

    let update_str = '';

    for (pos in values){
        var param = 1 + parseInt(pos);
        if(param > 1){
            update_str += `, `;
        }
        update_str += `${fields[pos]} = $${param}`;
    }

    var query = {
        text: `UPDATE ${table} SET ${update_str} WHERE ${id_field} = $${values.length+1}::text`,
        values: values,
    };

    query.values.push(id);

    execute_query(configuration, query, callback);
}

function delete_sql(configuration, table, field, value, callback){
      var query = {
        text: `DELETE FROM  ${table} WHERE ${field} = $1::text`,
        values: [value],
    };
    execute_query(configuration, query, callback);
}

function init_sql(configuration, init_sql_path){
    const fs = require('fs');
    fs.readFile(init_sql_path, 'utf-8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var query;
        query = {
            text : data,
            values : []
        };
        execute_query(configuration, query, (result) => {
            console.log('Database created');
        });
    });
}

exports.select_sql = select_sql;
exports.select_all_sql = select_all_sql;
exports.update_sql = update_sql;
exports.delete_sql = delete_sql;
exports.insert_sql = insert_sql;
exports.init_sql = init_sql;