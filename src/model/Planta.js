import crypto from 'node:crypto';

export default class Planta {
	constructor({
		id,
		nome,
		outrosnomes,
		familia,
		origem,
		partesusadas,
		caracteristicas,
		usos,
	}) {
		this.id = id ?? crypto.randomUUID();
		this.nome = nome;
		this.outrosnomes = outrosnomes;
		this.familia = familia;
		this.origem = origem;
		this.partesusadas = partesusadas;
		this.caracteristicas = caracteristicas;
		this.usos = usos;
	}
}
