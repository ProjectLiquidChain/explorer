import { Block } from "@/components/block/block";
import { Numeric } from "@/components/numeric/numeric";
import { Table, TableColumn } from "@moai/core";
import { Time } from "@/components/time/time";
import { pluralizeTransaction } from "@/components/transaction/transaction";
import { BlockTableHeight } from "../height/height";
import s from "./wide.module.css";

interface Props {
	blocks: Block[];
}

interface RowProps {
	block: Block;
}

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
			<Numeric value={count} type="integer" />
			<span> </span>
			<span>{pluralizeTransaction(count)}</span>
		</span>
	);
};

export const getBlockColumns = ({ blocks }: Props): TableColumn[] => [
	{
		title: "Height",
		className: s.height,
		render: (i) => <BlockTableHeight block={blocks[i]} showDot={false} />,
	},
	{
		title: "Hash",
		className: s.hash,
		render: (i) => <span>{blocks[i].hash}</span>
	},
	{
		title: "Transactions",
		className: s.transactions,
		render: (i) => <Transactions block={blocks[i]} />,
	},
	{
		title: "Time",
		className: s.time,
		render: (i) => <BlockTime block={blocks[i]} />,
	},
];

export const BlockTableWide = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table
			columns={getBlockColumns(props)}
			rowKey={(index) => props.blocks[index].height.toString()}
			rowsLength={props.blocks.length}
		/>
	</div>
);