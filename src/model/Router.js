export class Router {
	constructor({ router, method, path, handler, NEED_AUTH }) {
		this.router = router;
		this.method = method;
		this.path = path;
		this.handler = handler;
		this.NEED_AUTH = NEED_AUTH;
	}
}
