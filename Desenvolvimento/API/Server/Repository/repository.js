const db = require('./postgres.js')

class Repository{
    constructor(table){
        this.table = table
    }

    datagram(){
        return this.table.split('_')[0];
    }

    findById(id){
        id_field = this.datagram() + 'id';

        db.select_query(this.table, id_field, id, callback)
        .then( (results) =>
            return 
        );
    }

    update(id, field, value){
        return null;
    }
}

module.exports = Repository;