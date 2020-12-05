import { Block } from "@/components/block/block";
import {
	getBlocksByRange,
	getLatestBlock,
} from "@/components/block/fetch/fetch";
import { BlockTable } from "@/components/block/table/table";
import { container } from "@/components/container/container";
import { Heading } from "@/components/heading/heading";
import { PageErrorProps } from "@/components/page/error/error";
import { Page, PageDefaultHead } from "@/components/page/page";
import { DivPx, Pane } from "@moai/core";
import { GetStaticProps } from "next";
import * as React from "react";

interface Props {
	blocks: Block[];
}

type PageProps = PageErrorProps<Props>;

const getNewBlocks = async (prevHeight: Block["height"]): Promise<Block[]> => {
	const latest = await getLatestBlock(undefined);
	const from = latest.height - 1;
	const to = Math.max(prevHeight + 1, latest.height - 10);
	if (from < to) return [];
	const blocks = await getBlocksByRange(from, to);
	return [latest, ...blocks];
};

const setNewBlocks = async (
	lastHeight: React.MutableRefObject<number>,
	setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
): Promise<void> => {
	const newBlocks = await getNewBlocks(lastHeight.current);
	if (newBlocks.length === 0) return;
	setBlocks((prevBlocks) => {
		const isContinue =
			newBlocks[newBlocks.length - 1].height === prevBlocks[0].height + 1;
		return isContinue ? [...newBlocks, ...prevBlocks].slice(0, 10) : newBlocks;
	});
};

const HomeBody = (props: Props) => {
	const [blocks, setBlocks] = React.useState(props.blocks);
	const lastHeight = React.useRef(1);

	React.useEffect(() => {
		lastHeight.current = blocks[0].height;
	}, [blocks]);

	React.useEffect(() => {
		window.setInterval(() => {
			setNewBlocks(lastHeight, setBlocks);
		}, 5000);
	}, [lastHeight, setBlocks]);

	return (
		<div className={container.max960}>
			<DivPx size={16} />
			<Heading>Latest blocks</Heading>
			<Pane noPadding children={<BlockTable blocks={blocks} />} />
		</div>
	);
};

const HomePage = (page: PageProps) => (
	<Page
		title={() => PageDefaultHead.title}
		description={() => PageDefaultHead.description}
		page={page}
		Body={HomeBody}
	/>
);

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	const interval = process.env.NEXT_PUBLIC_BLOCK_INTERVAL;
	if (interval === undefined) throw Error("BLOCK_INTERVAL is undefined");
	const revalidate = parseInt(interval);

	try {
		const latest = await getLatestBlock(undefined);
		const { height } = latest;
		const recents = await getBlocksByRange(height - 1, height - 9);
		const blocks = [latest, ...recents];
		return { revalidate, props: { hasError: false, blocks } };
	} catch (error) {
		return { revalidate, props: { hasError: true, error: error.message } };
	}
};

export default HomePage;
