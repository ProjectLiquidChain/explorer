import { Primitive } from "../server/server";

export interface ContractParameter {
	name: string;
	type: Primitive;
}

export interface ContractFunction {
	name: string;
	parameters: ContractParameter[];
}

export interface ContractEvent {
	name: string;
	parameters: ContractParameter[];
}

interface Header {
	version: number;
	events: ContractEvent[];
	functions: ContractFunction[];
}

export interface Contract {
	header: Header;
	code: string;
}
