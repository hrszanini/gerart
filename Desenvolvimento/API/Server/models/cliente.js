const Endereco = require('./endereco');

class Cliente{
    constructor(){
        this.nome;
        this.endereco = Endereco();
        this.email;
        this.telefone;
        this.poder_executivo;
    }
}

module.exports = Cliente;