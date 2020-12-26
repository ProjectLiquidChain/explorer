import { DivPx, Pane } from "@moai/core";
import { useEffect, useState } from "react";
import { Block } from "../block/block";
import { getRecentBlocks } from "../block/fetch/fetch";
import { BlockTableNarrow } from "../block/table/narrow/narrow";
import { Heading } from "../heading/heading";
import { Receipt } from "../receipt/receipt";
import { getRecentTransactions } from "../transaction/fetch/fetch";
import { TransactionTableNarrow } from "../transaction/table/narrow/narrow";
import { Transaction } from "../transaction/transaction";
import s from "./feed.module.css";

interface Props {
	blocks: Block[];
	transactions: Transaction[];
	receipts: Receipt[];
}

export const Feed = (props: Props): JSX.Element => {
	const [blocks, setBlocks] = useState(props.blocks);
	const [transactions, setTransactions] = useState(props.transactions);
	const [receipts, setReceipts] = useState(props.receipts);

	useEffect(() => {
		const timer = window.setInterval(async () => {
			const blocks = await getRecentBlocks(undefined);
			setBlocks(blocks);
		}, 5000);
		return () => window.clearInterval(timer);
	}, []);

	useEffect(() => {
		const timer = window.setInterval(async () => {
			const result = await getRecentTransactions(undefined);
			setTransactions(result.transactions);
			setReceipts(result.receipts);
		}, 5000);
		return () => window.clearInterval(timer);
	}, []);

	return (
		<div className={s.container}>
			<div className={s.column}>
				<Heading>Latest blocks</Heading>
				<Pane noPadding>
					<BlockTableNarrow blocks={blocks} />
				</Pane>
			</div>
			<DivPx size={32} />
			<div className={s.column}>
				<Heading>Latest transactions</Heading>
				<Pane noPadding>
					<TransactionTableNarrow
						transactions={transactions}
						receipts={receipts}
					/>
				</Pane>
			</div>
		</div>
	);
};
