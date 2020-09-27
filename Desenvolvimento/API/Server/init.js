function read_schema_file(schema_file_path, callback){
    const fs = require('fs');
    fs.readFile(schema_file_path, 'utf8', (err, data) => {
        if (err) throw err;
        callback(data);
    });
}

function execute_query(query){
    const { Client } = require('pg');

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    client.connect();

    client.query(query, (err, res) => {
        if (err) throw err
        client.end();
    });
}

exports.init_database = () => {
    read_schema_file(process.env.DB_SQL_INIT,execute_query);
};
