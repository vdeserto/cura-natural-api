import crypto from 'node:crypto';

export default class EfeitoTerapeutico {
	constructor({ nome, descricao }) {
		this.id = crypto.randomUUID();

		this.nome = nome;
		this.descricao = descricao;
	}
}
