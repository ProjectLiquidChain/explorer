import { ContractAccount } from "./account";
import { serverCall, ServerCall } from "./server/server";

interface Parameter {
	name: string;
	type: string;
}

interface Function {
	name: string;
	parameters: Parameter[];
}

interface Event {
	name: string;
	parameters: Parameter[];
}

interface Header {
	version: number;
	events: Event[];
	functions: Function[];
}

export interface Contract {
	header: Header;
	code: string;
}

export const getContract: ServerCall<
	{ address: ContractAccount["address"] },
	{ contract: Contract }
> = (p) => serverCall("chain.GetContract", p);
