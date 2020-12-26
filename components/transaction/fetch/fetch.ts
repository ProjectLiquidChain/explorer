import { serverCall, ServerCall } from "@/components/server/server";
import {
	CompletedTransaction,
	completeTransactions,
	Transaction,
} from "../transaction";

export const getTransaction: ServerCall<
	Transaction["hash"],
	CompletedTransaction
> = async (hash) => {
	const result = await serverCall("chain.GetTransaction", { hash });
	return { ...result.transaction, receipt: result.receipt };
};

export const getRecentTransactions: ServerCall<
	{ page: number },
	{ transactions: CompletedTransaction[]; totalPages: number }
> = async ({ page }) => {
	const options = { limit: 100, page: page };
	const r = await serverCall("surf.GetTxs", options);
	const transactions = completeTransactions(r.transactions, r.receipts);
	return { transactions, totalPages: r.totalPages };
};
