import { serverCall, ServerCall } from "@/components/server/server";
import { Transaction } from "@/components/transaction/transaction";
import { Transfer } from "@/components/transfer/transfer";
import { Account, Asset, ContractAccount, UserAccount } from "../account";

type AccountCall<T> = ServerCall<Account["address"], T>;

export const getAccount: AccountCall<
	null | ContractAccount | UserAccount
> = async (address) => {
	const result = await serverCall("chain.GetAccount", { address });
	const account = result.account;
	account.address = address;
	return account;
};

export const getAccountTransactions: AccountCall<Transaction[]> = async (
	address
) => {
	const result = await serverCall("surf.GetAccountTxs", { address });
	return result.transactions;
};

export const getAccountTransfers: AccountCall<Transfer[]> = async (address) => {
	const result = await serverCall("surf.GetAccountTransfers", { address });
	return result.transfers;
};

export const getAccountAssets: AccountCall<Asset[]> = async (address) => {
	const result = await serverCall("surf.GetAccountAssets", { address });
	return result.assets;
};
