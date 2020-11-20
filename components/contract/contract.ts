import { Primitive } from "../server/server";

export interface ContractParameter {
	name: string;
	type: Primitive;
}

export interface ContractFunction {
	name: string;
	parameters: ContractParameter[];
}

interface Header {
	version: number;
	events: ContractFunction[];
	functions: ContractFunction[];
}

export interface Contract {
	header: Header;
	code: string;
}
