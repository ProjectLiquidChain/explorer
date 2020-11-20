import { getRange } from "@/components/numeric/range";
import { ServerCall, serverCall, Hash } from "../server/server";
import { Receipt, Transaction } from "../transaction/transaction";

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
