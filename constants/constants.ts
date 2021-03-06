export const BLOCK_INTERVAL_SECONDS: number = (() => {
	const interval = process.env.NEXT_PUBLIC_BLOCK_INTERVAL_SECONDS;
	if (typeof interval === "string") return parseInt(interval);
	throw Error("BLOCK_INTERVAL is undefined");
})();

export const API_SERVER: string = (() => {
	const host = process.env.NEXT_PUBLIC_SERVER_HOST;
	if (typeof host === "string") return host;
	throw Error("SERVER_HOST is not defined");
})();


export const API_SURF_SERVER: string = (() => {
	const host = process.env.NEXT_PUBLIC_SERVER_SURF_HOST;
	if (typeof host === "string") return host;
	throw Error("SERVER_SURF_HOST is not defined");
})();
