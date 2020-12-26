import { ContractAccount, UserAccount } from "../account/account";
import { Argument } from "../argument/argument";
import { Block } from "../block/block";
import { Receipt } from "../receipt/receipt";

interface Payload {
	name: string;
	args: Argument[];
}

export interface Transaction {
	hash: string; // Key
	type: "deploy" | "invoke";
	height: Block["height"];
	version: number;
	sender: UserAccount["address"];
	nonce: number;
	receiver: ContractAccount["address"];
	payload: Payload;
	gasPrice: number;
	gasLimit: number;
	signature: string;
}

export const pluralizeTransaction = (count: number): string =>
	count > 1 ? "transactions" : "transaction";

export interface TransactionBundle {
	transaction: Transaction;
	receipt: Receipt;
}

export const completeTransactions = (
	transactions: Transaction[],
	receipts: Receipt[]
): TransactionBundle[] => {
	return transactions.map((transaction, index) => {
		return { transaction, receipt: receipts[index] };
	});
};
