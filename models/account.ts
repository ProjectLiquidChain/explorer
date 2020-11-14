import { Address, Hash } from "./basic";
import { serverCall, ServerCall } from "./server/server";

interface Account {
	address: Address; // Key
	nonce: number;
	storageHash: Hash;
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

export const isUserAccount = (acc: Account): acc is UserAccount => {
	return (acc as ContractAccount).contractHash === "0".repeat(32);
};

export const isContractAccount = (acc: Account): acc is ContractAccount => {
	return isUserAccount(acc) === false;
};
