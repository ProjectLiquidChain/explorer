import { getRange } from "@/components/numeric/range";
import { serverCall, ServerCall } from "@/components/server/server";
import { Receipt, Transaction } from "@/components/transaction/transaction";
import { Block } from "../block";

/**
 * The transaction array and receipt array returned by server don't share the
 * same order (i.e. receipts[i] may not related to transactions[i]). This sorts
 * the receipts in the same order as transactions.
 */
const sortReceipts = (block: Block): Block => {
	const receiptMap: Map<Transaction["hash"], Receipt> = new Map();
	block.receipts.forEach((receipt) => {
		receiptMap.set(receipt.transaction, receipt);
	});
	const receipts = block.transactions.map((transaction) => {
		const receipt = receiptMap.get(transaction.hash);
		if (receipt !== undefined) return receipt;
		throw Error(`Receipt not found for transaction: ${transaction.hash}`);
	});
	return { ...block, receipts };
};

export const getLatestBlock: ServerCall<undefined, Block> = async () => {
	const result = await serverCall("chain.GetLatestBlock", undefined);
	return sortReceipts(result.block);
};

export const getBlockByHeight: ServerCall<Block["height"], Block> = async (
	height
) => {
	const result = await serverCall("chain.GetBlockByHeight", { height });
	return sortReceipts(result.block);
};

export const getBlocksByRange = async (
	from: Block["height"],
	to: Block["height"]
): Promise<Block[]> => {
	const heights = getRange(from, to);
	return await Promise.all(heights.map(getBlockByHeight));
};
