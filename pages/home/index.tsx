import { Block } from "@/components/block/block";
import { getBlocksByRange, getLatestBlock } from "@/components/block/fetch/fetch";
import { BlockTable } from "@/components/block/table/table";
import { container } from "@/components/container/container";
import { Heading } from "@/components/heading/heading";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Pane } from "@/components/pane/pane";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

interface Props {
	blocks: Block[];
}

type PageProps = PageErrorProps<Props>;

const HomeBody = (props: Props) => (
	<div className={container.max960}>
		<DivPx size={16} />
		<Heading>Latest blocks</Heading>
		<Pane noPadding>
			<BlockTable blocks={props.blocks} />
		</Pane>
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
