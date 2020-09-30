const Endereco = require('./endereco');

class Galeria{
    constructor(){
        this.nome;
        this.endereco = Endereco();
        this.email;
        this.site;
        this.contatos = [];
    }
}

module.exports = Galeria;