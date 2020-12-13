import { Asset } from "@/components/asset/asset";
import { Receipt } from "@/components/receipt/receipt";
import { serverCall, ServerCall } from "@/components/server/server";
import { Transaction } from "@/components/transaction/transaction";
import { Transfer } from "@/components/transfer/transfer";
import { Account, createFakeAccount } from "../account";

type AccountCall<T> = ServerCall<Account["address"], T>;

export const getAccount: AccountCall<Account> = async (address) => {
	const { account } = (await serverCall("chain.GetAccount", {
		address,
	})) as { account: Account | null };
	if (account === null) return createFakeAccount(address);
	account.address = address;
	return account;
};

export const getAccountTransactions: AccountCall<{
	receipts: Receipt[];
	transactions: Transaction[];
	transactionPages: number;
}> = async (address) => {
	const result = await serverCall("surf.GetAccountTxs", { address });
	const { totalPages, transactions, receipts } = result;
	return { transactions, receipts, transactionPages: totalPages };
};

export const getAccountTransfers: AccountCall<{
	transfers: Transfer[];
	transferPages: number;
}> = async (address) => {
	const result = await serverCall("surf.GetAccountTransfers", { address });
	const { transfers, totalPages } = result;
	return { transfers, transferPages: totalPages };
};

export const getAccountAssets: AccountCall<Asset[]> = async (address) => {
	const result = await serverCall("surf.GetAccountAssets", { address });
	return result.assets;
};
