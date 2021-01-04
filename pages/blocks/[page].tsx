import { Block } from "@/components/block/block";
import { getRecentBlocks } from "@/components/block/fetch/fetch";
import { BlockPagination } from "@/components/block/pagination/pagination";
import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { DivPx } from "@moai/core";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

interface Props {
	blocks: Block[];
	page: number;
	totalPages: number;
}

type PageProps = PageErrorProps<Props>;

const BlockIndexBody = (props: Props): JSX.Element => (
	<div className={container.max960}>
		<DivPx size={16} />
		<BlockPagination
			page={props.page}
			totalPages={props.totalPages}
			blocks={props.blocks}
		/>
	</div>
);

const BlockIndexPage = (page: PageProps) => (
	<Page
		title={() => "Blocks | Liquid"}
		description={() => "Recent blocks on Liquid network"}
		page={page}
		Body={BlockIndexBody}
	/>
);

export const getStaticPaths: GetStaticPaths = async () => ({
	fallback: "blocking",
	paths: [],
});

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	const revalidate = BLOCK_INTERVAL_SECONDS;

	try {
		const { page: pageStr } = context.params ?? {};
		if (typeof pageStr !== "string") throw Error("page is not defined");
		const page: number = parseInt(pageStr) - 1;
		if (isNaN(page)) throw Error(`Page "${page}" is not a number`);

		const result = await getRecentBlocks({ page });
		const { blocks, totalPages } = result;
		const props: Props = { blocks, totalPages, page };
		return { revalidate, props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { revalidate, props: { hasError: true, error } };
	}
};

export default BlockIndexPage;
