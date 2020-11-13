import { Receipt, Transaction } from "./transaction";

export interface Block {
	height: number; // Key
	hash: string;
	transactions: Transaction[];
	receipts: Receipt[];
	time: number;
	parent: Block["hash"];
	stateRoot: Block["hash"];
	transactionRoot: Transaction["hash"];
	receiptRoot: string; // @TODO: What is this type?
}
