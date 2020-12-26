import { Receipt } from "@/components/receipt/receipt";
import { serverCall, ServerCall } from "@/components/server/server";
import { Transaction } from "../transaction";

export const getTransaction: ServerCall<
	Transaction["hash"],
	{ transaction: Transaction; receipt: Receipt }
> = (hash) => {
	return serverCall("chain.GetTransaction", { hash });
};

export const getRecentTransactions: ServerCall<
	{ page: number },
	{ transactions: Transaction[]; receipts: Receipt[], totalPages: number }
> = async ({ page }) => {
	const result = await serverCall("surf.GetTxs", { limit: 100, page: page });
	const { transactions, receipts, totalPages } = result;
	return { transactions, receipts, totalPages };
};
