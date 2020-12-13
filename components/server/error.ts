type Type = "jrpc" | "http" | "other";

/** JSON serializable error */
export interface ServerError {
	type: Type;
	title: string;
	message: string;
}

export const isServerError = (unknown: unknown): unknown is ServerError => {
	if (!unknown) return false;
	if (typeof unknown !== "object") return false;
	const error = unknown as ServerError;
	return (
		typeof error.title === "string" &&
		typeof error.type === "string" &&
		typeof error.message === "string"
	);
};

export const toServerError = (error: unknown): ServerError => {
	if (isServerError(error)) return error;
	if (error instanceof Error) {
		return {
			title: "Unexpected Error",
			message: `${error.name}: ${error.message ?? "no message"}`,
			type: "other",
		};
	}
	console.log(error);
	throw Error(`Unknown error type: ${error}`);
};
