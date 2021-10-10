const { Client } = require('pg');

class Driver {
    constructor(configuration){
        this.configuration = configuration;
    }

    ClauseConverter(clauses, startParamPosition){
        if(startParamPosition == null || startParamPosition == undefined) {
            startParamPosition = 1;
        }

        if(clauses.length > 0) {
            let clausesFields = ' WHERE ';

            for(var pos in clauses){
                let param = startParamPosition + parseInt(pos);
                let clause = clauses[pos];

                if(parseInt(pos) > 0)
                    clausesFields += ` AND `;

                clausesFields += `${clause.field} ${clause.comparator} $${param}`;
            }

            return clausesFields;
        } else {
            return '';
        }
    }

    Execute(query, callback){
        const client = new Client({
            host : this.configuration.host,
            port: this.configuration.port,
            user : this.configuration.user,
            password: this.configuration.password,
            database: this.configuration.database
        });

        client.connect(err => {
            if (err) {
            console.error("Error connecting on database.", err.stack)
            } else {
                client.query(query.text, query.values, (err, res) => {
                    if (err) throw err
                    callback(res.rows);
                    client.end();
                });
            }
        });
    }

    Select(table, fields, clauses, callback){
        if(table == null){
            callback(null);
            return;
        }

        if(fields == null || fields.length == 0) {
            fields = ['*'];
        }

        if(clauses == null || clauses.length == 0) {
            clauses = [];
        }
        
        let queryFields = fields.reduce((str, field) =>{
            if (str != '') str += ','
            return `${str} ${field}`;
        });

        var query = {
            text: `SELECT ${queryFields} FROM  ${table} ${this.ClauseConverter(clauses)}`,
            values: clauses.map((e) => e.value),
        };
        
        this.Execute(query, callback);
    }

    Insert(table, fieldValues, callback){
        var fields_str = '';
        var values_str = '';

        for(var pos in fieldValues){
            var param = 1 + parseInt(pos);
            var field_value = fieldValues[pos];
            if(param > 1){
                values_str += ',';
                fields_str += ',';
            }

            values_str += ` $${param}`;
            fields_str += ` ${field_value.field}`;
        }

        var query = {
            text: `INSERT INTO  ${table}(${fields_str}) VALUES (${values_str})`,
            values: fieldValues.map((e) => e.value),
        };

        this.Execute(query, callback);
    }

    Update(table, fieldValues, clauses, callback){
        let filterClauses = clauses.filter((e) => {return e.field != null});
        let filterFieldValues = fieldValues.filter((e) => {return e.value != null && e.value != undefined});
        
        var paramPosition = 0;

        let updateStr = fieldValues.reduce((str, e) => {
            if(str != '') 
                str += ', ';
            return str + e
        }); 
        
        for(var pos in filterFieldValues){
            var fieldValue = filterFieldValues[pos];
            param = 1 + parseInt(pos);

            if(param > 1)
                updateStr += `, `;
    
            updateStr += `${fieldValue.field} = $${param}`;
        }

        console.log(callback);

        var query = {
            text: `UPDATE ${table} SET ${updateStr} ${this.ClauseConverter(filterClauses, fieldValues.length + 1)}`,
            values: filterFieldValues.map((e) => e.value),
        };

        filterClauses.map((e) => query.values.push(e.value));
        
        this.Execute(query, callback);
    }

    Delete(table, clauses, callback){
        let query = {
            text: `DELETE FROM  ${table} ${this.ClauseConverter(clauses)}`,
            values: clauses.map((e) => e.value),
        };

        this.Execute(query, callback);
    }
}

module.exports = { Driver };