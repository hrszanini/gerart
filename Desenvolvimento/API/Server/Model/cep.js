const Repository = require('./repository');

class Cep{
    constructor(id){
        this.repository = Repository('CEP_CEP');
        this.id = id;
    }

    get_cep(){
        return id;
    }

    get_logradouro(){
        return this.repository.find_by_id(this.id).cep_logradouro;
    }

    set_logradouro(logradouro){
        this.repository.update(this.id, 'cep_logradouro', logradouro);
    }

    get_bairro(){
        return this.repository.find_by_id(this.id).cep_bairro;
    }

    set_bairro(bairro){
        this.repository.update(this.id, 'cep_bairro', bairro);
    }

    get_cidade(){
       return this.repository.find_by_id(this.id).cep_cidade;
    }

    set_cidade(cidade){
        this.repository.update(this.id, 'cep_cidade', cidade);
    }

    get_estado(){
        return this.repository.find_by_id(this.id).cep_estado;
    }

    set_estado(estado){
        this.repository.update(this.id, 'cep_estado', estado);
    }
}