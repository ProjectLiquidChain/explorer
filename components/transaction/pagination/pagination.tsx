import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { DivPx, Pagination, Pane } from "@moai/core";
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

	const onPageChange = useCallback(async (page1: number): Promise<void> => {
		// 0-indexed vs 1-indexed
		const page0 = page1 - 1;
		const { transactions } = await getRecentTransactions({ page: page0 });
		setTransactions(transactions);
		setPage(page0);
		const url = `/transactions?page=${page1}`;
		await router.push(url, undefined, { shallow: true });
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Transactions</h1>
				<DivPx size={16} />
				<Pagination
					min={1}
					max={props.totalPages}
					value={page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Pane noPadding>
				<TransactionTableWide transactions={transactions} />
			</Pane>
		</div>
	);
};
