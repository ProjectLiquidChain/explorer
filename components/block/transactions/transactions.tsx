import { Block } from "@/components/block/block";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Pane } from "@moai/core";
import { TransactionsHeading } from "@/components/transaction/heading/heading";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { Border, DivPx } from "@moai/core";
import s from "./transactions.module.css";
import { completeTransactions } from "@/components/transaction/transaction";

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

const Table = ({ block }: Props): JSX.Element => {
	console.log(block);
	return (
		<div className={s.table}>
			<DivPx size={32} />
			<Border color="weak" />
			<TransactionTableWide
				transactions={completeTransactions(block.transactions, block.receipts)}
			/>
			<Border color="weak" />
		</div>
	);
};

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
