import jsonwebtoken from 'jsonwebtoken';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { Environment } from './constants/Environment.js';
import { router } from './router.js';
import { Routes } from './constants/Routes.js';
import { ValidateHeaders } from './handlers/post/Auth.js';

const VALID = {
	user: 'victor.deserto',
	password: '123',
};

const TOKEN_KEY = 'abc123'


async function LoginPostHandler(request, response) {
	const { user, password } = JSON.parse(await once(request, 'data'));
	if (user !== VALID.user || password !== VALID.password) {
		response.writeHead(400);
		response.end(JSON.stringify({ error: 'user invalid' }));
		return;
	}

	const token = jsonwebtoken.sign({ user, message: 'desertin' }, TOKEN_KEY);

	return response.end(JSON.stringify({ token }));
}

/**
 *	Validate headers to routes listed into process.env.NEED_AUTH_ROUTELIST
 * 
 * @param {Request} request
 * @param {Response} response
 * @returns falsy if not authenticated else true
 */


/**
 *
 * @param {Request} request
 * @param {Response} response
 * @returns who will handle the request entries after matching route
 */
async function handler(request, response) {
	const chosenRoute = Object.assign(
		{},
		...router.filter(
			({ method, path }) =>
				request.method === method && request.url === path
		)
	);
	if (Object.entries(chosenRoute).length === 0) {
		response.writeHead(400);
		return response.end('Not Found!');
	}
	
	if (chosenRoute.NEED_AUTH === true && chosenRoute.path !== Routes.AUTH) {
		const authenticated = await ValidateHeaders(request, response);
		console.log(authenticated)
		if(!authenticated){
			response.writeHead(401);
			return response.end('Token inválido');
		}
	}
	// console.log(chosenRoute)
	// const {handler} = chosenRoute
	// console.log(await handler(request, response) )
	return await chosenRoute.handler(request, response);
}

const app = createServer(handler).listen(Number(Environment.PORT), () =>
	console.log(`Listening on ${Environment.BASE_URL}`)
);

export { app, LoginPostHandler, ValidateHeaders };
