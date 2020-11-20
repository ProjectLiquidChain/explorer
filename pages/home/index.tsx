import { BlockTable } from "@/components/block/table/table";
import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Block, getBlocksByRange, getLatestBlock } from "@/models/block";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

interface Props {
	blocks: Block[];
}

type PageProps = PageErrorProps<Props>;

const HomeBody = (props: Props) => (
	<div className={container.max960}>
		<DivPx size={16} />
		<BlockTable blocks={props.blocks} />
		<DivPx size={32} />
	</div>
);
const HomePage = (page: PageProps) => <Page page={page} Body={HomeBody} />;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
	try {
		const latest = await getLatestBlock(undefined);
		const { height } = latest;
		const recents = await getBlocksByRange(height - 1, height - 9);
		const blocks = [latest, ...recents];
		return { props: { hasError: false, blocks } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export default HomePage;
