import { getLatestBlock } from "@/components/block/fetch/fetch";
import { serverCall, ServerCall } from "@/components/server/server";
import { Status } from "../status";

export const getStatus: ServerCall<undefined, Status> = async () => {
	// Need both endpoints because the server's status does not have all info
	// as the client's one
	const results = await Promise.all([
		serverCall("surf.GetStatus", undefined),
		getLatestBlock(undefined),
	]);
	return {
		blockHeight: results[1].height,
		blockAverageTime: results[0].averageBlockTime,
		transactionCount: results[0].totalTxs,
		price: parseFloat(results[0].price),
	};
};
