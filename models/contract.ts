import { ContractAccount } from "./account";
import { serverCall, ServerCall } from "./server/server";

interface Parameter {
	name: string;
	type:
		| "uint8"
		| "uint16"
		| "uint32"
		| "uint64"
		| "int8"
		| "int16"
		| "int32"
		| "int64"
		| "float32"
		| "float64"
		| "address"
		| "lparray";
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
