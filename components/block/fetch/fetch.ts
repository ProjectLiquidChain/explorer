import { serverCall, ServerCall } from "@/components/server/server";
import { Block } from "../block";

export const getLatestBlock: ServerCall<undefined, Block> = async () => {
	const result = await serverCall("chain.GetLatestBlock", undefined);
	return result.block;
};

export const getBlockByHeight: ServerCall<Block["height"], Block> = async (
	height
) => {
	const result = await serverCall("chain.GetBlockByHeight", { height });
	return result.block;
};

export const getRecentBlocks: ServerCall<
	{ page: number, limit?: number },
	{ blocks: Block[]; totalPages: number }
> = async ({ page, limit }) => {
	const options = { page, limit: limit ?? 100 }
	const result = await serverCall("surf.GetBlocks", options);
	const { blocks, totalPages } = result;
	return { blocks, totalPages };
};
