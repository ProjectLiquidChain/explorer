import { Hash } from "./basic";
import { ServerCall, serverCall } from "./server/server";
import { Receipt, Transaction } from "./transaction";

export interface Block {
	height: number; // Key
	hash: Hash;
	transactions: Transaction[];
	receipts: Receipt[];
	time: number;
	parent: Block["hash"];
	stateRoot: Hash;
	transactionRoot: Hash;
	receiptRoot: Hash;
}

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
