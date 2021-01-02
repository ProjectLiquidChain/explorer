import { Asset } from "@/components/asset/asset";
import { serverCall, ServerCall } from "@/components/server/server";
import {
	TransactionBundle,
	bundleTransactions,
} from "@/components/transaction/transaction";
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

export const getAccountTransactions: ServerCall<
	{ address: Account["address"]; page: number },
	{ transactions: TransactionBundle[]; transactionPages: number }
> = async ({ address, page }) => {
	const r = await serverCall("surf.GetAccountTxs", { address, page });
	const transactions = bundleTransactions(r.transactions, r.receipts);
	return { transactions, transactionPages: r.totalPages };
};

export const getAccountTransfers: ServerCall<
	{ address: Account["address"]; page: number },
	{ transfers: Transfer[]; transferPages: number }
> = async ({ address, page }) => {
	const opts = { address, page };
	const result = await serverCall("surf.GetAccountTransfers", opts);
	const { transfers, totalPages } = result;
	return { transfers, transferPages: totalPages };
};

export const getAccountAssets: AccountCall<Asset[]> = async (address) => {
	const result = await serverCall("surf.GetAccountAssets", { address });
	return result.assets;
};
