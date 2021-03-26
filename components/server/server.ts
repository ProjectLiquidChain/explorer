import { API_SERVER, API_SURF_SERVER } from "constants/constants";
import { ServerError } from "./error";

// @TODO: Should define these as nominal types
// https://github.com/microsoft/TypeScript/issues/202

export type Hash = string;

export type Address = string;

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
	const url = method.startsWith("surf") ? API_SURF_SERVER : API_SERVER;

	const response = await fetch(url, {
		method: "POST",
		headers: headers,
		body: body,
	});

	if (response.ok === false) {
		const error: ServerError = {
			type: "http",
			title: response.status.toString(),
			message: response.statusText,
		};
		throw error;
	}

	const json = await response.json();
	if (json.error) {
		console.log(body, json);
		const error: ServerError = {
			type: "jrpc",
			title: "Invalid Request",
			message: `${json.error.message} (code: ${json.error.code})`,
		};
		throw error;
	}

	return json.result;
};

export type ServerCall<P, R> = (params: P) => Promise<R>;
