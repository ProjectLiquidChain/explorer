import { ServerError } from "./error";

const host = process.env.NEXT_PUBLIC_SERVER_HOST;

// @TODO: Should define these as nominal types
// https://github.com/microsoft/TypeScript/issues/202

export type Hash = string;

export type Address = string;

if (typeof host !== "string") throw Error("SERVER_HOST is not defined");

export const serverCall = async (
	method: `${"surf" | "chain"}.${string}`,
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
	const url = method.startsWith("surf") ? `${host}/surf` : host;

	const response = await fetch(url, {
		method: "POST",
		headers: headers,
		body: body,
	});

	if (response.ok === false) {
		throw new ServerError({
			type: "http",
			title: response.status.toString(),
			message: response.statusText,
		});
	}

	const json = await response.json();
	if (json.error) {
		throw new ServerError({
			type: "jrpc",
			title: json.error.code,
			message: `${json.error.message} (${json.error.data})`,
		});
	}

	return json.result;
};

export type ServerCall<P, R> = (params: P) => Promise<R>;
