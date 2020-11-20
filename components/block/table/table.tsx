import {
	Block,
	getBlocksByRange,
	getLatestBlock,
} from "@/components/block/block";
import { Numeric } from "@/components/numeric/numeric";
import { Table, TableColumn } from "@/components/table/table";
import { Time } from "@/components/time/time";
import { useEffect, useState } from "react";
import { BlockHeight } from "../height/height";
import s from "./table.module.css";

interface Props {
	blocks: Block[];
}

interface RowProps {
	block: Block;
}

const getNewBlocks = async (from: Block["height"]): Promise<Block[]> => {
	const latest = await getLatestBlock(undefined);
	if (latest.height === from) return [];
	const blocks = await getBlocksByRange(latest.height - 1, from + 1);
	return [latest, ...blocks];
};

const BlockTime = ({ block }: RowProps): JSX.Element => (
	<span>
		<Time value={block.time * 1000} format="relative" />
		<span> — </span>
		<Time value={block.time * 1000} format="time" />
	</span>
);

const Transactions = ({ block }: RowProps): JSX.Element => {
	const count = block.transactions.length;
	return (
		<span>
			<Numeric value={count} format="integer" />
			<span> </span>
			<span>{count > 1 ? "trxns" : "trxn"}</span>
		</span>
	);
};

export const BlockTable = (props: Props) => {
	const [blocks, setBlocks] = useState<Block[]>(props.blocks);

	useEffect(() => {
		const fn = async () => {
			const recents = await getNewBlocks(blocks[0].height);
			setBlocks([...recents, ...blocks].slice(0, 10));
		};
		const id = window.setTimeout(fn, 2000);
		return () => window.clearTimeout(id);
	}, [blocks]);

	const columns: TableColumn[] = [
		{
			title: "Height",
			className: s.height,
			render: (i) => <BlockHeight value={blocks[i].height} />,
		},
		{
			title: "Hash",
			className: s.hash,
			render: (i) => <span>{blocks[i].hash}</span>,
		},
		{
			title: "Trxns",
			className: s.transactions,
			render: (i) => <Transactions block={blocks[i]} />,
		},
		{
			title: "Time",
			className: s.time,
			render: (i) => <BlockTime block={blocks[i]} />,
		},
	];

	return (
		<div className={s.container}>
			<Table
				columns={columns}
				rowKey={(index) => blocks[index].height.toString()}
				rowsLength={blocks.length}
			/>
		</div>
	);
};
