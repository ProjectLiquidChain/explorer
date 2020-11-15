import { Page } from "@/components/page/page";
import { Block, getBlockByHeight } from "@/models/block";
import { GetServerSideProps } from "next";
import { BlockHeader } from "./header/header";

interface Props {
	block: Block;
}

const BlockPage = ({ block }: Props) => (
	<Page>
		<BlockHeader height={block.height} />
	</Page>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const { height: heightStr } = context.query;
	if (typeof heightStr !== "string") throw Error("Height is not defined");
	const heightNum: number = parseInt(heightStr);
	if (isNaN(heightNum)) throw Error(`Height "${heightStr}" is not a number`);
	const block = await getBlockByHeight(heightNum);
	return { props: { block } };
};

export default BlockPage;
