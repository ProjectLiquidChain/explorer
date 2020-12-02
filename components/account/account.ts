import { Address, Hash } from "../server/server";

export interface Token {
	address: Address;
	currency: string;
	decimals: number;
}

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

export const isUserAccount = (acc: Account): acc is UserAccount => {
	return (acc as ContractAccount).contractHash === "0".repeat(64);
};

export const isContractAccount = (acc: Account): acc is ContractAccount => {
	return isUserAccount(acc) === false;
};
