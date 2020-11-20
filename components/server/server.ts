const host = process.env.NEXT_PUBLIC_SERVER_HOST;

if (typeof host !== "string") throw Error("SERVER_HOST is not defined");

class JrpcError extends Error {
	code: number;
	data: any;

	constructor(message: string, code: number, data: any) {
		super(message);
		this.code = code;
		this.data = data;
	}
}

export const serverCall = async (
	method: string,
	params: unknown
): Promise<any> => {
	const body: BodyInit = JSON.stringify({
		method: method,
		id: 0, // Not necessary for REST atm
		jsonrpc: "2.0",
		params: params,
	});
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};
	const response = await fetch(host, {
		method: "POST",
		headers: headers,
		body: body,
	});
	const json = await response.json();
	if (json.result !== undefined) return json.result;
	const e = json.error;
	throw new JrpcError(e.message, e.code, e.data);
};

export type ServerCall<P, R> = (params: P) => Promise<R>;
