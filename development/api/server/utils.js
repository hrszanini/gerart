const fs = require('fs');

function read_file(file_path, callback){
    fs.readFile(file_path, 'utf-8', function (err,data) {
        if (err)
            return console.log(err);
        callback(data);
    });
}

exports.read_file = read_file;