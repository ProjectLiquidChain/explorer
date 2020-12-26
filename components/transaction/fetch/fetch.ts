import { Receipt } from "@/components/receipt/receipt";
import { serverCall, ServerCall } from "@/components/server/server";
import { Transaction } from "../transaction";

export const getTransaction: ServerCall<
	Transaction["hash"],
	{ transaction: Transaction; receipt: Receipt }
> = (hash) => {
	return serverCall("chain.GetTransaction", { hash });
};

/**
 * Return 10 latest transactions
 */
export const getRecentTransactions: ServerCall<
	undefined,
	{ transactions: Transaction[]; receipts: Receipt[] }
> = async () => {
	const result = await serverCall("surf.GetTxs", { limit: 10, page: 0 });
	const { transactions, receipts } = result;
	return { transactions, receipts };
};
