import { BlockHeight } from "@/components/block/height/height";
import { Link } from "@/components/link/link";
import { Receipt } from "@/components/receipt/receipt";
import { Table, TableColumn } from "@/components/table/table";
import { Transaction } from "@/components/transaction/transaction";
import { Tag } from "@moai/core";
import { getTableColumns } from "../wide/wide";
import s from "./narrow.module.css";

interface Props {
	transactions: Transaction[];
	receipts: Receipt[];
}

const NARROW_COLUMNS = ["Hash", "Type", "Receiver", "Block"];

const getColumns = (props: Props) => {
	const all = getTableColumns(props);
	return all.filter((column) => {
		return NARROW_COLUMNS.includes(column.title);
	});
};

export const TransactionTableNarrow = (props: Props) => (
	<div className={s.container}>
		<Table
			columns={getColumns(props)}
			rowKey={(index) => props.transactions[index].hash}
			rowsLength={props.transactions.length}
		/>
	</div>
);
