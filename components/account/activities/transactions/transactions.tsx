import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { TransactionBundle } from "@/components/transaction/transaction";
import { Border, Paragraph, Pagination } from "@moai/core";
import { useCallback, useState } from "react";
import { Account } from "../../account";
import { getAccountTransactions } from "../../fetch/fetch";
import s from "./transactions.module.css";

interface Props {
	address: Account["address"];
	transactions: TransactionBundle[];
	totalPages: number;
}

export const AccountActivitiesTransactions = (props: Props): JSX.Element => {
	const [transactions, setTransactions] = useState(props.transactions);
	const [page, setPage] = useState<number>(0);

	const { address } = props;
	const onPageChange = useCallback(
		async (page1): Promise<void> => {
			const page = page1 - 1;
			const result = await getAccountTransactions({ address, page });
			setTransactions(result.transactions);
			setPage(page);
		},
		[address]
	);

	// NOTE: use initialTransactions, not the paginated transactions
	return props.transactions.length === 0 ? (
		<div className={s.header}>
			<Paragraph>No recent transactions</Paragraph>
		</div>
	) : (
		<div>
			<div className={s.header}>
				<Pagination
					min={1}
					max={props.totalPages}
					value={page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Border color="weak" />
			<TransactionTableWide transactions={transactions} />
		</div>
	);
};
