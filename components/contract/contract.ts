import { Argument } from "../argument/argument";

export interface ContractParameter {
	name: string;
	type: Argument["type"];
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
