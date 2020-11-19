import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Block, getBlockByHeight } from "@/models/block";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";
import { BlockHeader } from "./header/header";
import { BlockOverview } from "./overview/overview";
import { BlockTransactions } from "./transactions/transactions";

interface Props {
	block: Block;
}

type PageProps = PageErrorProps<Props>;

const BlockBody = ({ block }: Props): JSX.Element => (
	<div className={container.max960}>
		<BlockHeader block={block} />
		<BlockOverview block={block} />
		<DivPx size={32} />
		<BlockTransactions block={block} />
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
