import { Pagination } from "@/components/pagination/pagination";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { TransactionBundle } from "@/components/transaction/transaction";
import { Border, Paragraph } from "@moai/core";
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
		async (page): Promise<void> => {
			const result = await getAccountTransactions({ address, page });
			setTransactions(result.transactions);
			setPage(page);
		},
		[address]
	);

	// NOTE: use initialTransactions, not the paginated transactions
	return props.transactions.length === 0 ? (
		<Paragraph>No recent transactions</Paragraph>
	) : (
		<div>
			<div className={s.pagination}>
				<Pagination
					total={props.totalPages - 1}
					current={page}
					onPageChange={onPageChange}
				/>
			</div>
            <Border color="weak" />
			<TransactionTableWide transactions={transactions} />
		</div>
	);
};
