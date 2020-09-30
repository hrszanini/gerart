const Endereco = require('./endereco');

class Funcionario{
    constructor(){
        this.nome;
        this.endereco = Endereco();
        this.email;
        this.telefone;
        this.cargo;
    }
}

module.exports = Funcionario;