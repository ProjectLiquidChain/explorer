import { Block } from "@/components/block/block";
import { Table } from "@moai/core";
import { ReactNode } from "react";
import { getBlockColumns } from "../wide/wide";
import s from "./narrow.module.css";

interface Props {
	blocks: Block[];
}

const NARROW_COLUMNS: ReactNode[] = ["Height", "Time", "Transactions"];

const getColumns = (props: Props) => {
	const all = getBlockColumns(props);
	return all.filter((column) => {
		return NARROW_COLUMNS.includes(column.title);
	});
};

export const BlockTableNarrow = (props: Props) => (
	<div className={s.container}>
		<Table
			columns={getColumns(props)}
			rowKey={(index) => props.blocks[index].height.toString()}
			rowsLength={props.blocks.length}
		/>
	</div>
);
