CREATE TABLE IF NOT EXISTS CEP_CEP(
	cep_id VARCHAR(8) PRIMARY KEY,
	cep_logradouro VARCHAR(255) NOT NULL,
	cep_bairro VARCHAR(255) NOT NULL,
	cep_cidade VARCHAR(255) NOT NULL,
	cep_estado VARCHAR(2) NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS END_ENDERECO_SEQUENCE_END_ID ;

CREATE TABLE IF NOT EXISTS END_ENDERECO(
    end_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('END_ENDERECO_SEQUENCE_END_ID'),
	end_nome VARCHAR(255),
	cep_id VARCHAR(8) REFERENCES CEP_CEP,
	end_numero INTEGER NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS GLR_GALERIA_SEQUENCE_GLR_ID ;

CREATE TABLE IF NOT EXISTS GLR_GALERIA(
	glr_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('GLR_GALERIA_SEQUENCE_GLR_ID'),
	glr_nome VARCHAR(255) NOT NULL,
	end_id INTEGER REFERENCES END_ENDERECO,
	glr_email VARCHAR(255),
	glr_site VARCHAR(255)
);

CREATE SEQUENCE IF NOT EXISTS PAS_PESSOA_SEQUENCE_PSA_ID ;

CREATE TABLE IF NOT EXISTS PSA_PESSOA(
	psa_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('PAS_PESSOA_SEQUENCE_PSA_ID'),
	psa_nome VARCHAR(255) NOT NULL,
	end_id INTEGER REFERENCES END_ENDERECO,
	psa_email VARCHAR(255),
	psa_telefone VARCHAR(255),
	psa_poder_aquisitivo VARCHAR(255)
);

CREATE SEQUENCE IF NOT EXISTS EDT_EDITAL_SEQUENCE_EDT_ID ;

CREATE TABLE IF NOT EXISTS EDT_EDITAL(
	edt_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('EDT_EDITAL_SEQUENCE_EDT_ID'),
	edt_link VARCHAR(255),
	edt_dt_inicio TIMESTAMP  NOT NULL,
	edt_dt_entrega TIMESTAMP NOT NULL,
	edt_dt_resultado TIMESTAMP NOT NULL,
	edt_valor_inscricao REAL,
	edt_valor_premiacao REAL
);

CREATE SEQUENCE IF NOT EXISTS OBR_OBRA_SEQUENCE_OBR_ID ;

CREATE TABLE IF NOT EXISTS OBR_OBRA(
	obr_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('OBR_OBRA_SEQUENCE_OBR_ID'),
	obr_nome varchar NOT NULL,
	obr_tamanho VARCHAR(255),
	obr_tecnica VARCHAR(255),
	obr_tipo_tela VARCHAR(255),
	obr_artista VARCHAR(255),
	end_id INTEGER REFERENCES END_ENDERECO,
	obr_status_venda VARCHAR(255),
	obr_valor REAL,
	obr_apreco_interno REAL,
	obr_apreco_externo REAL
);

CREATE SEQUENCE IF NOT EXISTS MTR_MATERIAL_SEQUENCE_MTR_ID ;

CREATE TABLE IF NOT EXISTS MTR_MATERIAL(
	mtr_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('MTR_MATERIAL_SEQUENCE_MTR_ID'),
	mtr_tipo VARCHAR(255),
	mtr_especificacao VARCHAR(255),
	mtr_quantidade INTEGER,
	mtr_preco REAL,
	end_id INTEGER REFERENCES END_ENDERECO,
	mtr_durabilidade INTEGER
);

CREATE TABLE IF NOT EXISTS EDO_EDITAL_OBRA(
	edt_id INTEGER REFERENCES EDT_EDITAL,
	obr_id INTEGER REFERENCES OBR_OBRA
);

CREATE TABLE IF NOT EXISTS GLP_GALERIA_PESSOA(
	glr_id INTEGER REFERENCES GLR_GALERIA,
	psa_id INTEGER REFERENCES PSA_PESSOA,
	glp_cargo VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PSO_PESSOA_OBRA(
	psa_id INTEGER REFERENCES PSA_PESSOA,
	obr_id INTEGER REFERENCES OBR_OBRA,
	pso_posse BOOL NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS PRV_PROPOSTA_VENDA_SEQUENCE_PRV_ID ;

CREATE TABLE IF NOT EXISTS PRV_PROPOSTA_VENDA(
	prv_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('PRV_PROPOSTA_VENDA_SEQUENCE_PRV_ID'),
	prv_forma_pagamento VARCHAR(255),
	prv_dt_proposta TIMESTAMP,
	prv_dt_entrega TIMESTAMP,
	prv_status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS OBM_OBRA_MATERIAL(
	obr_id INTEGER REFERENCES OBR_OBRA,
	mtr_id INTEGER REFERENCES MTR_MATERIAL
);

CREATE TABLE IF NOT EXISTS PRP_PROPOSTA_PESSOA(
	psa_id INTEGER REFERENCES PSA_PESSOA,
	prv_id INTEGER REFERENCES PRV_PROPOSTA_VENDA
);

CREATE TABLE IF NOT EXISTS PRO_PROPOSTA_OBRA(
	obr_id INTEGER REFERENCES OBR_OBRA,
	prv_id INTEGER REFERENCES PRV_PROPOSTA_VENDA,
	pro_valor REAL
);


