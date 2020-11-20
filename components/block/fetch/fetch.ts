import { getRange } from "@/components/numeric/range";
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

export const getBlocksByRange = async (
	from: Block["height"],
	to: Block["height"]
): Promise<Block[]> => {
	const heights = getRange(from, to);
	return await Promise.all(heights.map(getBlockByHeight));
};
