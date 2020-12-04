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
import { Pane } from "@moai/pane/pane";
import { DivPx } from "@moai/core";
import { GetStaticProps } from "next";

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
const HomePage = (page: PageProps) => (
	<Page
		title={() => PageDefaultHead.title}
		description={() => PageDefaultHead.description}
		page={page}
		Body={HomeBody}
	/>
);

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	try {
		const latest = await getLatestBlock(undefined);
		const { height } = latest;
		const recents = await getBlocksByRange(height - 1, height - 9);
		const blocks = [latest, ...recents];
		return { revalidate: 1, props: { hasError: false, blocks } };
	} catch (error) {
		return { revalidate: 1, props: { hasError: true, error: error.message } };
	}
};

export default HomePage;
