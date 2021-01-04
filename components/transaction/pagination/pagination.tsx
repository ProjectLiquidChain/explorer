import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { DivPx, Pagination, Pane } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { TransactionBundle } from "../transaction";
import s from "./pagination.module.css";

interface Props {
	transactions: TransactionBundle[];
	page: number;
	totalPages: number;
}

export const TransactionPagination = (props: Props): JSX.Element => {
	const router = useRouter();

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		await router.push(`/transactions/${page}`, undefined);
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Transactions</h1>
				<DivPx size={16} />
				<Pagination
					min={1}
					max={props.totalPages}
					value={props.page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Pane noPadding>
				<TransactionTableWide transactions={props.transactions} />
			</Pane>
		</div>
	);
};
