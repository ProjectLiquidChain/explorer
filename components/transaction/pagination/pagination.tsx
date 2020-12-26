import { Pagination } from "@/components/pagination/pagination";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { DivPx, Pane } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { TransactionBundle } from "../transaction";
import s from "./pagination.module.css";

interface Props {
	transactions: TransactionBundle[];
	page: number;
	totalPages: number;
}

export const TransactionPagination = (props: Props): JSX.Element => {
	const router = useRouter();

	const [transactions, setTransactions] = useState(props.transactions);
	const [page, setPage] = useState(props.page);

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		const { transactions } = await getRecentTransactions({ page });
		setTransactions(transactions);
		setPage(page);
		const url = `/transactions?page=${page}`;
		await router.push(url, undefined, { shallow: true });
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Transactions</h1>
				<DivPx size={16} />
				<Pagination
					current={page}
					onPageChange={onPageChange}
					total={props.totalPages}
				/>
			</div>
			<Pane noPadding>
				<TransactionTableWide transactions={transactions} />
			</Pane>
		</div>
	);
};
