import { serverCall, ServerCall } from "./server/server";

interface Account {
	address: string; // Key
	nonce: number;
	storageHash: string;
	creator: Account["address"];
}

export interface ContractAccount extends Account {
	contractHash: string;
}

export interface UserAccount extends Account {}

export const getAccount: ServerCall<
	{ address: Account["address"] },
	{ account: null | ContractAccount | UserAccount }
> = async (params) => {
	const account = await serverCall("chain.GetAccount", params);
	account.address = params.address;
	return account;
};
