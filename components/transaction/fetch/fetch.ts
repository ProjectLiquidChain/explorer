import { serverCall, ServerCall } from "@/components/server/server";
import {
	bundleTransactions,
	Transaction,
	TransactionBundle,
} from "../transaction";

export const getTransaction: ServerCall<
	Transaction["hash"],
	TransactionBundle
> = async (hash) => {
	const result = await serverCall("chain.GetTransaction", { hash });
	const { transaction, receipt } = result;
	return { transaction, receipt };
};

export const getRecentTransactions: ServerCall<
	{ page: number },
	{ transactions: TransactionBundle[]; totalPages: number }
> = async ({ page }) => {
	const options = { limit: 100, page: page };
	const r = await serverCall("surf.GetTxs", options);
	const transactions = bundleTransactions(r.transactions, r.receipts);
	return { transactions, totalPages: r.totalPages };
};
