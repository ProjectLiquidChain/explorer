import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionPagination } from "@/components/transaction/pagination/pagination";
import { TransactionBundle } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

interface Props {
	transactions: TransactionBundle[];
	page: number;
	totalPages: number;
}

type PageProps = PageErrorProps<Props>;

const TransactionIndexBody = (props: Props): JSX.Element => (
	<div className={container.max960}>
		<DivPx size={16} />
		<TransactionPagination
			page={props.page}
			totalPages={props.totalPages}
			transactions={props.transactions}
		/>
	</div>
);

const TransactionIndexPage = (page: PageProps) => (
	<Page
		title={() => "Transactions | Liquid"}
		description={() => "Recent transactions on Liquid network"}
		page={page}
		Body={TransactionIndexBody}
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

		const result = await getRecentTransactions({ page });
		const { transactions, totalPages } = result;
		const props: Props = { transactions, totalPages, page };
		return { revalidate, props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { revalidate, props: { hasError: true, error } };
	}
};

export default TransactionIndexPage;
