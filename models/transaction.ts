import { serverCall, ServerCall } from "./server/server";
import { ContractAccount, UserAccount } from "./account";
import { Block } from "./block";
import { Hash } from "./basic";

interface Argument {
	type: string;
	name: string;
	value: string;
}

interface Call {
	name: string;
	contract: ContractAccount["address"];
	arguments: Argument[];
}

export interface Transaction {
	hash: string; // Key
	type: "deploy" | "invoke";
	height: Block["height"];
	version: number;
	sender: UserAccount["address"];
	nonce: 0;
	receiver: ContractAccount["address"];
	payload: object;
	gasPrice: number;
	gasLimit: number;
	signature: string;
}

export interface Receipt {
	transaction: Transaction["hash"];
	result: string;
	gasUsed: number;
	code: number;
	events: Call[];
	postState: Hash;
}

export const getTransaction: ServerCall<
	{ hash: Transaction["hash"] },
	{ transaction: Transaction; receipt: Receipt }
> = (p) => serverCall("chain.GetTransaction", p);
