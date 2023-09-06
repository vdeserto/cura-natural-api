import jsonwebtoken from 'jsonwebtoken';
import { Routes } from '../constants/Routes.js';

/**
 *	Validate headers to routes listed into process.env.NEED_AUTH_ROUTELIST
 *
 * @param {Request} request
 * @param {Response} response
 * @returns falsy if not authenticated else true
 */

export async function ValidateHeaders(request, response) {
    try {
        const TOKEN_KEY = 'abc123';

		const { headers } = request;
		const auth = headers.authorization.replace(/bearer\s/gi, '');
		jsonwebtoken.verify(auth, TOKEN_KEY);

		if(request.url !== Routes.AUTH)
			return true;
		else
			return response.end(JSON.stringify(true))
	} catch (error) {
		console.error(`Token inválido ::: ${error}`)
		if(request.url !== Routes.AUTH)
			return false;
		else
			return response.end(JSON.stringify(false))
	}
}