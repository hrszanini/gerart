const EnderecoRepository = require("../repositories/endereco_repository");

class EnderecoService {
    constructor() {
        this.enderecoRepository = new EnderecoRepository();       
    }

    GetEndereco(id, callback) {
        this.enderecoRepository.FindById(id, callback);
    }

    AddEndereco(endereco, callback) {
        this.enderecoRepository.Add(endereco, callback);
    }

    ListAllEnderecos(callback) {
        this.enderecoRepository.List(callback);
    }
}

module.exports = EnderecoService;