import { Heading } from "@/components/heading/heading";
import { Pagination } from "@/components/pagination/pagination";
import { Receipt } from "@/components/receipt/receipt";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { DivPx, Pane } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Transaction } from "../transaction";
import s from "./pagination.module.css";

interface Props {
	transactions: Transaction[];
	receipts: Receipt[];
	page: number;
	totalPages: number;
}

export const TransactionPagination = (props: Props): JSX.Element => {
	const router = useRouter();

	const [transactions, setTransactions] = useState(props.transactions);
	const [receipts, setReceipts] = useState(props.receipts);
	const [page, setPage] = useState(props.page);

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		const result = await getRecentTransactions({ page });
		setTransactions(result.transactions);
		setReceipts(result.receipts);
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
				<TransactionTableWide transactions={transactions} receipts={receipts} />
			</Pane>
		</div>
	);
};
