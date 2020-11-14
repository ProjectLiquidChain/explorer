import { Block, getBlockByHeight, getLatestBlock } from "@/models/block";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface Props {
	blocks: Block[];
}

const getRange = (from: number, to: number): number[] => {
	if (from === to) return [from];
	const [start, stop] = [Math.min(from, to), Math.max(from, to)];
	const range = Array(stop - start + 1)
		.fill(start)
		.map((x, y) => x + y);
	return from < to ? range : range.reverse();
};

const getBlocks = async (
	from: Block["height"],
	to: Block["height"]
): Promise<Block[]> => {
	const heights = getRange(from, to);
	return await Promise.all(heights.map(getBlockByHeight));
};

const getNewBlocks = async (from: Block["height"]): Promise<Block[]> => {
	const latest = await getLatestBlock(undefined);
	if (latest.height === from) return [];
	const blocks = await getBlocks(latest.height - 1, from + 1);
	return [latest, ...blocks];
};

const BlockItem = (props: { block: Block }) => {
	const [recent, setRecent] = useState(true);
	useEffect(() => {
		const id = window.setTimeout(() => setRecent(false), 1000);
		return () => window.clearTimeout(id);
	}, []);
	return (
		<div>
			Block: {props.block.height} - {props.block.hash}
			{recent ? " (new)" : ""}
		</div>
	);
};

const Home = (props: Props) => {
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const latest = await getLatestBlock(undefined);
	const recents = await getBlocks(latest.height - 1, latest.height - 4);
	const blocks = [latest, ...recents];
	return { props: { blocks } };
};

export default Home;
