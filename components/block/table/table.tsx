import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@/components/pane/pane";
import { Table } from "@/components/table/table";
import { Time } from "@/components/time/time";
import { Block, getBlocksByRange, getLatestBlock } from "@/models/block";
import { text } from "@moai/core";
import Link from "next/link";
import { useEffect, useState } from "react";
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

const Height = ({ block }: RowProps): JSX.Element => (
	<Link href={`/block/${block.height}`}>
		<a className={[s.link, text.highlight].join(" ")}>{block.height}</a>
	</Link>
);

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

const Hash = ({ block }: RowProps): JSX.Element => <span>{block.hash}</span>;

const Body = ({ blocks }: { blocks: Block[] }): JSX.Element => (
	<Table
		columns={[
			{
				title: "Height",
				className: s.height,
				render: (i) => <Height block={blocks[i]} />,
			},
			{
				title: "Hash",
				className: s.hash,
				render: (i) => <Hash block={blocks[i]} />,
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
		]}
		rowKey={(index) => blocks[index].height.toString()}
		rowsLength={blocks.length}
	/>
);

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

	return (
		<div>
			<h2 className={[s.heading, text.strong].join(" ")}>Latest Blocks</h2>
			<Pane>
				<div className={s.container}>
					<Body blocks={blocks} />
				</div>
			</Pane>
		</div>
	);
};
