import jsonwebtoken from 'jsonwebtoken';

export async function ValidateHeaders(request, response) {
    try {
        const TOKEN_KEY = 'abc123';

		const { headers } = request;
		const auth = headers.authorization.replace(/bearer\s/gi, '');
		jsonwebtoken.verify(auth, TOKEN_KEY);
		return response.end(JSON.stringify(true));
	} catch (error) {
		console.error(`Token inválido ::: ${error}`)
		return response.end(JSON.stringify(false));
	}
}