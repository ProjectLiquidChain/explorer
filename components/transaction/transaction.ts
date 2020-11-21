import { ContractAccount, UserAccount } from "../account/account";
import { Block } from "../block/block";
import { Hash, serverCall, ServerCall, Primitive } from "../server/server";

interface Argument {
	type: Primitive;
	name: string;
	value: string;
}

interface Call {
	name: string;
	contract: ContractAccount["address"];
	args: Argument[];
}

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

export interface Receipt {
	transaction: Transaction["hash"];
	// result: 0; // @TODO: Asking for meaning
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
