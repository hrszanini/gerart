const Endereco = require("./endereco");

class Material{
    constructor(){
        this.tipo;
        this.especificacao;
        this.quantidade;
        this.preco;
        this.endereco = Endereco();
        this.durabilidade;
    }
}

module.exports = Material;