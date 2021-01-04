import { Block } from "@/components/block/block";
import { getRecentBlocks } from "@/components/block/fetch/fetch";
import { BlockPagination } from "@/components/block/pagination/pagination";
import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	context
) => {
	const page: number = (() => {
		const query = context.query.page ?? "0";
		const page = Array.isArray(query) ? query[0] : query;
		return parseInt(page);
	})();

	try {
		const result = await getRecentBlocks({ page });
		const { blocks, totalPages } = result;
		const props: Props = { blocks, totalPages, page };
		return { props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { props: { hasError: true, error } };
	}
};

export default BlockIndexPage;
