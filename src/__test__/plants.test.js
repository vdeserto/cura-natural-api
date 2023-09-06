import { describe, before, beforeEach, after, it } from 'node:test';
import { deepStrictEqual, notDeepStrictEqual } from 'node:assert';
import { Environment } from '../constants/Environment.js';
import { Routes } from '../constants/Routes.js';
import { Methods } from '../constants/Methods.js';

describe('Plants Suit test', () => {
	let SERVER = {};
	let TOKEN = '';
	let ID = 0;

	async function makeRequest(url, data) {
		const response = await fetch(url, {
			method: Methods.POST,
			body: JSON.stringify(data),
			headers: {
				authorization: TOKEN,
			},
		});
		deepStrictEqual(response.status, 200);
		return response.json();
	}

	async function setToken() {
		const input = {
			user: 'victor.deserto',
			password: '123',
		};
		const data = await makeRequest(
			`${Environment.BASE_URL}${Routes.LOGIN}`,
			input
		);
		TOKEN = `Bearer ${data.token}`;
	}

	before(async () => {
		SERVER = (await import('../index.js')).app;

		await new Promise((resolve, reject) =>
			SERVER.once('listening', resolve)
		);
	});

	before(async () => setToken());

	it(`Should Authenticate the user [Plants]`, async () => {
		const data = await makeRequest(
			`${Environment.BASE_URL}${Routes.AUTH}`,
			{}
		);

		notDeepStrictEqual(data, {});
	});

	it('Should List all Plants', async () => {
		const response = await fetch(
			`${Environment.BASE_URL}${Routes.PLANTAS}`,
			{
				method: Methods.GET,
				headers: {
					authorization: TOKEN,
				},
			}
		);
		deepStrictEqual(response.status, 200);
		const data = await response.json();

		notDeepStrictEqual(data, []);
	});

	it('Should Create One Plant', async () => {
		const plantaNova = {
			nome: 'Capim Cidreira',
			outrosnomes: 'Cidreira',
			familia: 'Familia dos Capins',
			origem: 'Regiões tropicais da Ásia (Índia)',
			partesusadas: 'Folhas',
			caracteristicas:
				'Longas folhas semelhantes a capim, com um odor caracteristico',
			usos: 'Geralmente para acalmar as pessoas',
		};
		const response = await fetch(
			`${Environment.BASE_URL}${Routes.PLANTAS}`,
			{
				method: Methods.POST,
				body: JSON.stringify(plantaNova),
				headers: {
					authorization: TOKEN,
				},
			}
		);
		deepStrictEqual(response.status, 200);
		const data = await response.json();
		const {
			nome,
			outrosnomes,
			familia,
			origem,
			partesusadas,
			caracteristicas,
			usos,
		} = data;

		ID = data.id;

		const responseToTest = {
			nome,
			outrosnomes,
			familia,
			origem,
			partesusadas,
			caracteristicas,
			usos,
		};

		deepStrictEqual(responseToTest, plantaNova);
	});

	it('Should List One Plant', async () => {
		const response = await fetch(
			`${Environment.BASE_URL}${Routes.PLANTAS}/${ID}`,
			{
				method: Methods.GET,
				headers: {
					authorization: TOKEN,
				},
			}
		);
		deepStrictEqual(response.status, 200);
		const data = await response.json();

		notDeepStrictEqual(data, []);
	});

	it('Should Merge Update One Plant', async () => {
		const plantaUpdatedData = {
			nome: 'Erva Cidreira',
			outrosnomes: 'Cidreira',
			familia: 'Ervas',
			origem: 'Regiões tropicais da Ásia (Índia)',
			partesusadas: 'Folhas',
			caracteristicas:
				'Pequenas folhas semelhantes a capim, com um odor caracteristico',
			usos: 'Geralmente para acalmar as pessoas',
		};

		const response = await fetch(
			`${Environment.BASE_URL}${Routes.PLANTAS}/${ID}`,
			{
				method: Methods.PUT,
				body: JSON.stringify(plantaUpdatedData),
				headers: {
					authorization: TOKEN,
				},
			}
		);
		deepStrictEqual(response.status, 200);
		const data = await response.json();

		notDeepStrictEqual(data, {
			nome: 'Capim Cidreira',
			outrosnomes: 'Cidreira',
			familia: 'Familia dos Capins',
			origem: 'Regiões tropicais da Ásia (Índia)',
			partesusadas: 'Folhas',
			caracteristicas:
				'Longas folhas semelhantes a capim, com um odor caracteristico',
			usos: 'Geralmente para acalmar as pessoas',
		});


		const {
			nome,
			outrosnomes,
			familia,
			origem,
			partesusadas,
			caracteristicas,
			usos,
		} = data;

		const responseToTest = {
			nome,
			outrosnomes,
			familia,
			origem,
			partesusadas,
			caracteristicas,
			usos,
		};

		
		deepStrictEqual(responseToTest, plantaUpdatedData)
	});

	it('Should Delete a Plant', async () => {
		const response = await fetch(
			`${Environment.BASE_URL}${Routes.PLANTAS}/${ID}`,
			{
				method: Methods.DELETE,
				headers: {
					authorization: TOKEN,
				},
			}
		);
		deepStrictEqual(response.status, 200);
		const data = await response.json();
		notDeepStrictEqual(data, {});
	});

	after((done) => SERVER.close(done));
});
