const driver = require('./postgres');

class Database{
    construct(table){
        this.table = table;
        this.configuration = driver.configure({
            user : process.env.DB_USER,
            host : process.env.DB_HOST,
            database : process.env.DB_DATABASE,
            password : process.env.DB_PASSWORD,
            port : process.env.DB_PORT
        });
    }

    select(field, value, callback){
        driver.select_sql(this.configuration, this.table, field, value, callback);
    }

    list(callback){
        driver.select_all_sql(this.configuration, this.table, callback);
    }

    insert(fields, values, callback){
        driver.insert_sql(this.configuration, this.table, fields, values, callback);
    }

    update(id, fields, values, callback){
        driver.update_sql(this.configuration, this.table, id, fields, values, callback);
    }

    delete(field, value, callback){
        driver.delete_sql(this.configuration, this.table, field, value, callback);
    }
}