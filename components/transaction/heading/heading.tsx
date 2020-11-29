import { Heading } from "@/components/heading/heading";
import { Receipt } from "@/components/receipt/receipt";
import { Transaction } from "../transaction";

interface Props {
	transactions: Transaction[];
	receipts: null | Receipt[];
}

const isError = (receipt: Receipt): boolean => receipt.code > 0;

export const TransactionsHeading = (props: Props): JSX.Element => {
	const { transactions, receipts } = props;
	const count = transactions.length;
	const errCount = receipts === null ? null : receipts.filter(isError).length;
	return (
		<Heading>
			<span>{`${count} ${count > 1 ? "Transactions" : "Transaction"}`}</span>
			{errCount !== null && (
				<span>{` (${errCount} ${errCount > 1 ? "errors" : "error"})`}</span>
			)}
		</Heading>
	);
};
