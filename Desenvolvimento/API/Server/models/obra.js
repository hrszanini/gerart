const Endereco = require("./endereco");

class Obra{
    constructor(){
        this.nome;
        this.tamanho;
        this.tecnica;
        this.tipo_tela;
        this.artista;
        this.endereco = Endereco();
        this.valor;
        this.apreco_interno;
        this.apreco_externo;
        this.status_venda;
        this.materiais = [];
    }
}

module.exports = Obra;