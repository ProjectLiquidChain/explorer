import { Address, Hash, serverCall, ServerCall } from "../server/server";

export interface Account {
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
	Account["address"],
	null | ContractAccount | UserAccount
> = async (address) => {
	const result = await serverCall("chain.GetAccount", { address });
	const account = result.account;
	account.address = address;
	return account;
};

export const isUserAccount = (acc: Account): acc is UserAccount => {
	return (acc as ContractAccount).contractHash === "0".repeat(64);
};

export const isContractAccount = (acc: Account): acc is ContractAccount => {
	return isUserAccount(acc) === false;
};
