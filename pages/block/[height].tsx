import { Hash } from "@/components/hash/hash";
import { Info } from "@/components/info/info";
import { Number } from "@/components/number/number";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Time } from "@/components/time/time";
import { Block, getBlockByHeight } from "@/models/block";
import { background, Border } from "@moai/core";
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
		<dl className={[s.overview, background.primary].join(" ")}>
			<Info
				label="Height"
				help="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
			>
				<Number format="integer" value={block.height} />
			</Info>
			<Info label="Time" help="The date and time at which a block is proposed.">
				<Time value={block.time * 1000} format="relative" />
				<span> — </span>
				<Time value={block.time * 1000} format="long" />
			</Info>
			<Info label="Hash">
				<Hash value={block.hash} />
			</Info>
			<Info label="Parent">
				<Hash value={block.parent} />
			</Info>
			<Info label="State root">
				<Hash value={block.stateRoot} />
			</Info>
		</dl>
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
