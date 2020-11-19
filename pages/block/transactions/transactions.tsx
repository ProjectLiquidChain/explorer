import { Info } from "@/components/info/info";
import { Pane } from "@/components/pane/pane";
import { TransactionTable } from "@/components/transaction-table/transaction-table";
import { Block } from "@/models/block";
import { Border, DivPx, text } from "@moai/core";
import s from "./transactions.module.css";

interface Props {
	block: Block;
}

const Heading = ({ count }: { count: number }): JSX.Element => (
	<h2 className={[s.heading, text.strong].join(" ")}>
		<span>{count} </span>
		<span>{count > 1 ? "transactions" : "transaction"}</span>
	</h2>
);

const Overview = ({ block }: Props): JSX.Element => (
	<Pane>
		<Info
			label="Transaction root"
			help="Transactions in this block is structured as a tree. This is the hash of that tree's root node."
			copy={block.transactionRoot}
		>
			<span className={s.hash}>{block.transactionRoot}</span>
		</Info>
		<DivPx size={16} />
		<Border color="weak" />
		<DivPx size={16} />
		<Info
			label="Receipt root"
			help="Receipts in this block is structured as a tree. This is the hash of that tree's root node."
			copy={block.receiptRoot}
		>
			<span className={s.hash}>{block.receiptRoot}</span>
		</Info>
	</Pane>
);

const Table = ({ block }: Props): JSX.Element => (
	<Pane>
		<div className={s.table}>
			<TransactionTable transactions={block.transactions} />
		</div>
	</Pane>
);

export const BlockTransactions = ({ block }: Props): JSX.Element => (
	<div>
		<Heading count={block.transactions.length} />
		<DivPx size={16} />
		<Overview block={block} />
		<DivPx size={32} />
		<Table block={block} />
	</div>
);
