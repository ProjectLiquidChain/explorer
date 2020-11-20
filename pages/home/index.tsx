import { getRange } from "@/components/numeric/range";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Block, getBlockByHeight, getLatestBlock } from "@/models/block";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface Props {
	blocks: Block[];
}

type PageProps = PageErrorProps<Props>;

const HomeBody = (props: Props) => {
	const [blocks, setBlocks] = useState<Block[]>(props.blocks);

	useEffect(() => {
		const fn = async () => {
			const recents = await getNewBlocks(blocks[0].height);
			setBlocks([...recents, ...blocks].slice(0, 10));
		};
		const id = window.setTimeout(fn, 2000);
		return () => window.clearTimeout(id);
	}, [blocks]);

	return (
		<div style={{ whiteSpace: "pre" }}>
			{blocks.map((block) => (
				<BlockItem key={block.height} block={block} />
			))}
		</div>
	);
};

const HomePage = (page: PageProps) => <Page page={page} Body={HomeBody} />;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
	try {
		const latest = await getLatestBlock(undefined);
		const recents = await getBlocks(latest.height - 1, latest.height - 4);
		const blocks = [latest, ...recents];
		return { props: { hasError: false, blocks } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export default HomePage;
