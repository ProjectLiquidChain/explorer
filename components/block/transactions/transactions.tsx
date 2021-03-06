import { Block } from "@/components/block/block";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { TransactionsHeading } from "@/components/transaction/heading/heading";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { bundleTransactions } from "@/components/transaction/transaction";
import { Border, DivPx, Pane } from "@moai/core";
import s from "./transactions.module.css";

interface Props {
	block: Block;
}

const Overview = ({ block }: Props): JSX.Element => (
	<div>
		<Info
			label="Transaction root"
			help="Transactions in this block is structured as a tree. This is the hash of that tree's root node."
			copy={block.transactionRoot}
			children={block.transactionRoot}
		/>
		<Divider />
		<Info
			label="Receipt root"
			help="Receipts in this block is structured as a tree. This is the hash of that tree's root node."
			copy={block.receiptRoot}
			children={block.receiptRoot}
		/>
	</div>
);

const Table = ({ block }: Props): JSX.Element => (
	<div className={s.table}>
		<DivPx size={32} />
		<Border color="weak" />
		<TransactionTableWide
			transactions={bundleTransactions(block.transactions, block.receipts)}
		/>
		<Border color="weak" />
	</div>
);

export const BlockTransactions = ({ block }: Props): JSX.Element => (
	<div>
		<TransactionsHeading
			receipts={block.receipts}
			transactions={block.transactions}
		/>
		<Pane>
			<Overview block={block} />
			{block.transactions.length > 0 && <Table block={block} />}
		</Pane>
	</div>
);
