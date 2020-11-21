import { ContractAccount } from "../account/account";
import { Hash, Primitive } from "../server/server";
import { Transaction } from "../transaction/transaction";

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

export interface Receipt {
	transaction: Transaction["hash"];
	result: number;
	gasUsed: number;
	code: number;
	events: Call[];
	postState: Hash;
}
