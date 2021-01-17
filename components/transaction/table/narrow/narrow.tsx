import { Table } from "@moai/core";
import { ReactNode } from "react";
import { TransactionBundle } from "../../transaction";
import { getTransactionColumns } from "../wide/wide";
import s from "./narrow.module.css";

interface Props {
	transactions: TransactionBundle[];
}

const NARROW_COLUMNS: ReactNode[] = ["Hash", "Type", "Receiver", "Block"];

const getColumns = () => {
	const all = getTransactionColumns();
	return all.filter((column) => {
		return NARROW_COLUMNS.includes(column.title);
	});
};

export const TransactionTableNarrow = (props: Props) => (
	<div className={s.container}>
		<Table
			rows={props.transactions}
			columns={getColumns()}
			rowKey={(bundle) => bundle.transaction.hash}
		/>
	</div>
);
