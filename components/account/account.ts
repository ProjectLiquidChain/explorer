import { Address, Hash } from "../server/server";

interface BaseAccount {
	address: Address; // Key
	nonce: number;
}

export interface ContractAccount extends BaseAccount {
	contractHash: string;
	storageHash: Hash;
	creator: BaseAccount["address"];
}

export interface UserAccount extends BaseAccount {}

export type Account = UserAccount | ContractAccount;

/**
 * A fake account is an account that is not yet created on the network but may
 * already received some tranfers/transactions (i.e. act as receiver)
 */
export const createFakeAccount = (address: Address): UserAccount => ({
	address,
	nonce: 0,
});

export const isUserAccount = (acc: Account): acc is UserAccount => {
	return !isContractAccount(acc);
};

// Contract hash of all user accounts
const zeroHash = "0".repeat(64);

export const isContractAccount = (acc: Account): acc is ContractAccount => {
	const { contractHash: hash } = acc as ContractAccount;
	return hash !== undefined && hash !== zeroHash;
};
