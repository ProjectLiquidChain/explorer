import { Block } from "@/components/block/block";
import { getBlockByHeight } from "@/components/block/fetch/fetch";
import { BlockHeader } from "@/components/block/header/header";
import { BlockOverview } from "@/components/block/overview/overview";
import { BlockTransactions } from "@/components/block/transactions/transactions";
import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { DivPx } from "@moai/core";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
	block: Block;
}

type PageProps = PageErrorProps<Props>;

const BlockBody = ({ block }: Props): JSX.Element => (
	<div className={container.max960}>
		<BlockHeader block={block} />
		<BlockOverview block={block} />
		<DivPx size={16} />
		<BlockTransactions block={block} />
	</div>
);

const BlockPage = (page: PageProps) => <Page page={page} Body={BlockBody} />;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	try {
		const { height: heightStr } = context.params ?? {};
		if (typeof heightStr !== "string") throw Error("Height is not defined");
		const heightNum: number = parseInt(heightStr);
		if (isNaN(heightNum)) throw Error(`Height "${heightStr}" is not a number`);
		const block = await getBlockByHeight(heightNum);
		return { props: { hasError: false, block } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export const getStaticPaths: GetStaticPaths = async () => ({
	fallback: true,
	paths: [],
});

export default BlockPage;
