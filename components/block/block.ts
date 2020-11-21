import { Receipt } from "../receipt/receipt";
import { Hash } from "../server/server";
import { Transaction } from "../transaction/transaction";

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
