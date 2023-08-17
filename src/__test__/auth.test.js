import { describe, before, after, it } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { Environment } from '../constants/Environment.js';
import { Routes } from '../constants/Routes.js';
import { Methods } from '../constants/Methods.js';

describe('Auth Test Suite', () => {
	let SERVER = {};
	let TOKEN = '';

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
		const responseData = await makeRequest(
			`${Environment.BASE_URL}${Routes.LOGIN}`,
			input
		);
		TOKEN = `Bearer ${responseData.token}`;
	}

	before(async () => {
		SERVER = (await import('../index.js')).app;

		await new Promise((resolve, reject) =>
			SERVER.once('listening', resolve)
		);
	});

	before(async () => await setToken());

	it(`Should Authenticate the user [Auth]`, async () => {
		const responseData = await makeRequest(
			`${Environment.BASE_URL}${Routes.AUTH}`,
			{}
		);
		
		deepStrictEqual(responseData, true);

		return responseData;
	});

	after(async (done) => await SERVER.close(done));
}); 