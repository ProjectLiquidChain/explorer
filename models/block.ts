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

export const getLatestBlock: ServerCall<undefined, { block: Block }> = (p) =>
	serverCall("chain.GetLatestBlock", p);

export const getBlockByHeight: ServerCall<
	{ height: Block["height"] },
	{ block: Block }
> = (p) => serverCall("chain.GetBlockByHeight", p);
