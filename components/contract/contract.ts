import { ContractAccount } from "./account";
import { PrimitiveType } from "./basic";
import { serverCall, ServerCall } from "./server/server";

export interface ContractParameter {
	name: string;
	type: PrimitiveType;
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

export const getContract: ServerCall<
	ContractAccount["address"],
	Contract
> = async (address) => {
	const result = await serverCall("chain.GetContract", { address });
	return result.contract;
};
