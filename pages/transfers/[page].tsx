import { Transfer } from "@/components/transfer/transfer";
import { getRecentTransfers } from "@/components/transfer/fetch/fetch";
import { TransferPagination } from "@/components/transfer/pagination/pagination";
import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { DivPx } from "@moai/core";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
	transfers: Transfer[];
	page: number;
	totalPages: number;
}

type PageProps = PageErrorProps<Props>;

const TransferIndexBody = (props: Props): JSX.Element => (
	<div className={container.max960}>
		<DivPx size={16} />
		<TransferPagination
			page={props.page}
			totalPages={props.totalPages}
			transfers={props.transfers}
		/>
	</div>
);

const TransferIndexPage = (page: PageProps) => (
	<Page
		title={() => "Transfers | Liquid"}
		description={() => "Recent transfers on Liquid network"}
		page={page}
		Body={TransferIndexBody}
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

		const result = await getRecentTransfers({ page });
		const { transfers, totalPages } = result;
		const props: Props = { transfers, totalPages, page };
		return { revalidate, props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { revalidate, props: { hasError: true, error } };
	}
};

export default TransferIndexPage;
