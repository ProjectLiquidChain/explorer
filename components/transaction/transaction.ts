import { ContractAccount, UserAccount } from "../account/account";
import { Block } from "../block/block";
import { Hash, serverCall, ServerCall } from "../server/server";

interface Argument {
	type: string;
	name: string;
	value: string;
}

export interface Call {
	name: string;
	contract: ContractAccount["address"];
	args: Argument[];
}

export interface TransactionPayload {
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
	Transaction["hash"],
	{ transaction: Transaction; receipt: Receipt }
> = (hash) => {
	return serverCall("chain.GetTransaction", { hash });
};
