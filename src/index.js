import jsonwebtoken from 'jsonwebtoken';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { Environment } from './constants/Environment.js';
import router from './router.js';
import { Routes } from './constants/Routes.js';
import { ValidateHeaders } from './handlers/AuthHandler.js';
import { Router } from './model/Router.js';

const VALID = {
	user: 'victor.deserto',
	password: '123',
};

const TOKEN_KEY = 'abc123';

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
	 * If they don't have same length, we already have a falsy return.
	 * If content is diferent, verify if 'urlRequest' has any :routeParameterName,
	 * in case truthy, we do a replacement returning true, else, return false
	 *
	 * @param {Request} request
	 * @param {Router} routePath
	 *
	 */
 function routeParamHandler(request, routePath) {
	const urlRequestSplittedArray = request.url.split('/');
	const urlRouteSplittedArray = routePath.split('/');

	const regexToValidate = /:([A-z]|[0-9])\w+/g; // like :routeParameterName123
	if (urlRequestSplittedArray.length !== urlRouteSplittedArray.length) {
		return Object.assign({}, { success: false });
	}

	for (let index = 1; index < urlRouteSplittedArray.length; index++) {
		// console.log(urlRequestSplittedArray, urlRouteSplittedArray);

		if (
			urlRequestSplittedArray[index] !== urlRouteSplittedArray[index]
		) {
			if (String(urlRouteSplittedArray[index]).match(regexToValidate)) {
				// console.log(urlRequestSplittedArray[index], urlRouteSplittedArray[index]);
				const nameOfParam = urlRouteSplittedArray[index].slice(1);
				return Object.assign({}, { success: true, params: {[nameOfParam]: urlRequestSplittedArray[index]} });
			}
			return Object.assign({}, { success: false });
		}
	}
}


/**
 *
 * @param {Request} request
 * @param {Response} response
 * @returns who will handle the request entries after matching route
 */
async function handler(request, response) {
	const chosenRoute = Object.assign(
		{},
		...router.filter(({ method, path }) => {
			if (request.method === method) {
				if (request.url === path) {
					return true;
				}
				const hasRouteParam = routeParamHandler(request, path);
				if(hasRouteParam.success === true){
					// console.log(hasRouteParam.params)
					request.params = hasRouteParam.params
					// console.log(request.params)
					return true;
				}
			}
			return false;
		})
	);

	

	if (Object.entries(chosenRoute).length === 0) {
		response.writeHead(400);
		return response.end('Not Found!');
	}

	if (chosenRoute.NEED_AUTH === true && chosenRoute.path !== Routes.AUTH) {
		const authenticated = await ValidateHeaders(request, response);
		// console.log(authenticated);
		if (!authenticated) {
			response.writeHead(401);
			return response.end('Token inválido');
		}
	}

	let body = []
	request.on('error', (err) => {
		console.error(err);
		response.end('Error on request');
	}).on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
	})

	return await chosenRoute.handler(request, response);
}

const app = createServer(handler).listen(Number(Environment.PORT), () =>
	console.log(`Listening on ${Environment.BASE_URL}`)
);

export { app, LoginPostHandler, ValidateHeaders };
