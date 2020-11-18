import { Info } from "@/components/info/info";
import { Number } from "@/components/number/number";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Time } from "@/components/time/time";
import { TransactionTable } from "@/components/transaction-table/transaction-table";
import { Block, getBlockByHeight } from "@/models/block";
import { background, Border, boxShadow, DivPx, text } from "@moai/core";
import { GetServerSideProps } from "next";
import { BlockHeader } from "./header/header";
import s from "./height.module.css";

interface Props {
	block: Block;
}

type PageProps = PageErrorProps<Props>;

const BlockBody = ({ block }: Props): JSX.Element => (
	<div>
		<BlockHeader height={block.height} />
		<Border color="weak" />
		<div className={[background.primary, boxShadow.strong].join(" ")}>
			<Info
				label="Height"
				help="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
				copy={block.height.toString()}
			>
				<Number format="integer" value={block.height} />
			</Info>
			<Border color="weak" />
			<Info label="Transactions">
				<Number format="integer" value={block.transactions.length} />
				<span> transaction(s) in this block</span>
			</Info>
			<Border color="weak" />
			<Info label="Time" help="The date and time at which a block is proposed.">
				<Time value={block.time * 1000} format="relative" />
				<span> — </span>
				<Time value={block.time * 1000} format="long" />
			</Info>
			<Border color="weak" />
			<Info label="Hash" help="The hash of this block" copy={block.hash}>
				<span className={s.hash}>{block.hash}</span>
			</Info>
			<Border color="weak" />
			<Info
				label="Parent"
				help="The hash of the parent of this block"
				copy={block.hash}
			>
				<span className={s.hash}>{block.parent}</span>
			</Info>
			<Border color="weak" />
			<Info label="State root" copy={block.stateRoot}>
				<span className={s.hash}>{block.stateRoot}</span>
			</Info>
		</div>
		<Border color="weak" />
		<DivPx size={32} />
		<h2 className={[s.heading, text.strong].join(" ")}>
			<span>{block.transactions.length} </span>
			<span>
				{block.transactions.length > 1 ? "transactions" : "transaction"}
			</span>
		</h2>
		<DivPx size={16} />
		<Border color="weak" />
		<div className={[background.primary, boxShadow.strong].join(" ")}>
			<Info
				label="Transaction root"
				help="Hash of the root of this block's transactions"
				copy={block.transactionRoot}
			>
				<span className={s.hash}>{block.transactionRoot}</span>
			</Info>
			<Border color="weak" />
			<Info
				label="Receipt root"
				help="Hash of the root of this block's receipts"
				copy={block.receiptRoot}
			>
				<span className={s.hash}>{block.transactionRoot}</span>
			</Info>
			<TransactionTable transactions={block.transactions} />
		</div>
		<Border color="weak" />
		<DivPx size={32} />
	</div>
);

const BlockPage = (page: PageProps) => <Page page={page} Body={BlockBody} />;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	context
) => {
	const { height: heightStr } = context.query;
	if (typeof heightStr !== "string") throw Error("Height is not defined");
	const heightNum: number = parseInt(heightStr);
	if (isNaN(heightNum)) throw Error(`Height "${heightStr}" is not a number`);
	try {
		const block = await getBlockByHeight(heightNum);
		return { props: { hasError: false, block } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export default BlockPage;
