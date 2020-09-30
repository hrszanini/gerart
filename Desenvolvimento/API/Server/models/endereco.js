const Cep = require('./cep');

class Endereco{
    constructor(){
        this.nome;
        this.numero;
        this.cep = Cep();
    }
}

module.exports = Endereco;