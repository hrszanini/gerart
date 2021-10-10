const ClienteRepository = require("../repositories/cliente_repository");

class ClienteService {
    constructor() {
        this.clienteRepository = new ClienteRepository();       
    }

    GetCliente(id, callback) {
        this.clienteRepository.FindById(id, callback);
    }

    AddCliente(cliente, callback) {
        this.clienteRepository.Add(cliente, callback);
    }

    ListAllClientes(callback) {
        this.clienteRepository.List(callback);
    }

    SetCliente(cliente, callback) {
        this.clienteRepository.Update(cliente, callback);
    }
}

module.exports = ClienteService;