type Type = "jrpc" | "http" | "other";

interface ServerErrorInit {
	type: Type;
	title: string;
	message: string;
}

export class ServerError implements ServerErrorInit {
	type: Type;
	title: string;
	message: string;

	constructor(init: ServerErrorInit) {
        this.type = init.type;
		this.title = init.title;
		this.message = init.message;
	}
}
