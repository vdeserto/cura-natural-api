export async function LoginPostHandler(request, response) {
	const { user, password } = JSON.parse(await once(request, 'data'));

	if (user !== VALID.user || password !== VALID.password) {
		response.writeHead(400);
		response.end(JSON.stringify({ error: 'user invalid' }));
		return;
	}

	const token = jsonwebtoken.sign({ user, message: 'desertin' }, TOKEN_KEY);

	response.end(JSON.stringify({ token }));
}
