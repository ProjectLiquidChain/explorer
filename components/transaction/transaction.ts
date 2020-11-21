import { ContractAccount, UserAccount } from "../account/account";
import { Block } from "../block/block";
import { Primitive } from "../server/server";

interface Argument {
	type: Primitive;
	name: string;
	value: string;
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
