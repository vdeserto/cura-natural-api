import crypto from 'node:crypto';

export default class Restricao {
	constructor({ nome, descricao }) {
		this.id = crypto.randomUUID();

		this.nome = nome;
		this.descricao = descricao;
	}

	isValid() {
		return !!this.nome && !!this.descricao;
	}
}
