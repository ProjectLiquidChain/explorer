import { Block } from "@/components/block/block";
import { Numeric } from "@/components/numeric/numeric";
import { Time } from "@/components/time/time";
import { pluralizeTransaction } from "@/components/transaction/transaction";
import { Table, TableColumn } from "@moai/core";
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

export const getBlockColumns = ({
	showDot,
}: {
	showDot: boolean;
}): TableColumn<Block>[] => [
	{
		title: "Height",
		className: s.height,
		render: (block) => <BlockTableHeight {...{ showDot, block }} />,
	},
	{
		title: "Hash",
		className: s.hash,
		render: (block) => <span>{block.hash}</span>,
	},
	{
		title: "Transactions",
		className: s.transactions,
		render: (block) => <Transactions block={block} />,
	},
	{
		title: "Time",
		className: s.time,
		render: (block) => <BlockTime block={block} />,
	},
];

export const BlockTableWide = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table
			rows={props.blocks}
			columns={getBlockColumns({ showDot: false })}
			rowKey={(block) => block.height.toString()}
		/>
	</div>
);
