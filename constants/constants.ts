export const BLOCK_INTERVAL: number = (() => {
	const interval = process.env.NEXT_PUBLIC_BLOCK_INTERVAL;
	if (typeof interval === "string") return parseInt(interval);
	throw Error("BLOCK_INTERVAL is undefined");
})();

export const API_SERVER: string = (() => {
	const host = process.env.NEXT_PUBLIC_SERVER_HOST;
	if (typeof host === "string") return host;
	throw Error("SERVER_HOST is not defined");
})();
