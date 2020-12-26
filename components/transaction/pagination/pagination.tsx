import { PaginationHeader } from "@/components/pagination-section/header/header";
import { Receipt } from "@/components/receipt/receipt";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { Pane } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Transaction } from "../transaction";

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
	const [busy, setBusy] = useState(false);

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		setBusy(true);
		const result = await getRecentTransactions({ page });
		setTransactions(result.transactions);
		setReceipts(result.receipts);
		setPage(page);
		router.push(`/transactions?page=${page}`, undefined, { shallow: true });
		setBusy(false);
	}, []);

	return (
		<div>
			<PaginationHeader
				heading="Recent Transactions"
				busy={busy}
				pagination={{ current: page, total: props.totalPages, onPageChange }}
			/>
			<Pane noPadding>
				<TransactionTableWide transactions={transactions} receipts={receipts} />
			</Pane>
		</div>
	);
};
