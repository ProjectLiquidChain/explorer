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

interface Recent {
	blocks: Block[];
	transactions: TransactionBundle[];
}

const getRecent = async (): Promise<Recent> => {
	const [{ blocks }, { transactions }] = await Promise.all([
		getRecentBlocks({ page: 0, limit: 10 }),
		getRecentTransactions({ page: 0, limit: 10 }),
	]);
	return { blocks, transactions };
};

export const Feed = (props: Props): JSX.Element => {
	const [recent, setRecent] = useState<Recent>(props);

	useEffect(() => {
		let timer = 0;
		const load = async () => {
			setRecent(await getRecent());
			timer = window.setTimeout(load, BLOCK_INTERVAL_SECONDS * 1000);
		};
		load();
		return () => window.clearTimeout(timer);
	}, []);

	return (
		<div className={s.container}>
			<div className={s.column}>
				<Heading>Latest blocks</Heading>
				<Pane noPadding>
					<BlockTableNarrow blocks={recent.blocks} />
				</Pane>
			</div>
			<DivPx size={32} />
			<div className={s.column}>
				<Heading>Latest transactions</Heading>
				<Pane noPadding>
					<TransactionTableNarrow transactions={recent.transactions} />
				</Pane>
			</div>
		</div>
	);
};
