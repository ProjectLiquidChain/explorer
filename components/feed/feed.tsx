import { DivPx, Pane } from "@moai/core";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { useEffect, useState } from "react";
import { Block } from "../block/block";
import { getRecentBlocks } from "../block/fetch/fetch";
import { BlockTableNarrow } from "../block/table/narrow/narrow";
import { Heading } from "../heading/heading";
import { getRecentTransactions } from "../transaction/fetch/fetch";
import { TransactionTableNarrow } from "../transaction/table/narrow/narrow";
import { TransactionBundle } from "../transaction/transaction";
import s from "./feed.module.css";

interface Props {
	blocks: Block[];
	transactions: TransactionBundle[];
}

export const Feed = (props: Props): JSX.Element => {
	const [blocks, setBlocks] = useState(props.blocks);
	const [transactions, setTransactions] = useState(props.transactions);

	useEffect(() => {
		const timer = window.setInterval(async () => {
			const { blocks } = await getRecentBlocks({ page: 0 });
			setBlocks(blocks);
		}, BLOCK_INTERVAL_SECONDS * 1000);
		return () => window.clearInterval(timer);
	}, []);

	useEffect(() => {
		const timer = window.setInterval(async () => {
			const result = await getRecentTransactions({ page: 0 });
			setTransactions(result.transactions.slice(0, 10));
		}, BLOCK_INTERVAL_SECONDS * 1000);
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
					<TransactionTableNarrow transactions={transactions} />
				</Pane>
			</div>
		</div>
	);
};
