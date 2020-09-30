const Cliente = require('./cliente');

class PropostaVenda{
    constructor(){
        this.obra_valor = {};
        this.cliente = Cliente();
        this.data_entrega;
        this.status;
    }
}

module.exports = PropostaVenda;