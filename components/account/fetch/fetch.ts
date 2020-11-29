import { serverCall, ServerCall } from "@/components/server/server";
import { Transaction } from "@/components/transaction/transaction";
import { Transfer } from "@/components/transfer/transfer";
import { Account, Asset, ContractAccount, UserAccount } from "../account";

export const getAccount: ServerCall<
	Account["address"],
	null | ContractAccount | UserAccount
> = async (address) => {
	const result = await serverCall("chain.GetAccount", { address });
	const account = result.account;
	account.address = address;
	return account;
};

export const getAccountTransactions: ServerCall<
	Account["address"],
	Transaction[]
> = async (address) => {
	const result = await serverCall("surf.GetAccountTxs", { address });
	return result.transactions;
};

export const getAccountTransfers: ServerCall<
	Account["address"],
	Transfer[]
> = async (address) => {
	const result = await serverCall("surf.GetAccountTransfers", { address });
	return result.transfers;
}

export const getAccountAssets: ServerCall<
	Account["address"],
	Asset[]
> = async (address) => {
	const result = await serverCall("surf.GetAccountAssets", { address });
	return result.assets;
}
