import { ContractAccount } from "../account/account";
import { Argument } from "../argument/argument";
import { Hash } from "../server/server";
import { Transaction } from "../transaction/transaction";

interface Event {
	name: string;
	contract: ContractAccount["address"];
	args: Argument[];
}

export interface Receipt {
	transaction: Transaction["hash"];
	result: number;
	gasUsed: number;
	code: number;
	events: Event[];
	postState: Hash;
}
