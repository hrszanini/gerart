const Query = require('pg').Query
const { Client } = require('pg');

function new_client(callback){
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    return client;
}

function select_query(table, field, value, callback){
    client = new_client();

    client.connect(err => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
            query =  new Query('SELECT FROM $1 WHERE $2 = $3;', [table, field, value]);
            client.query(query, (err, res) => {
                if (err) throw err

                callback.json(res.rows)

                client.end();
            });
        }
    })
}

exports.select_query = select_query;