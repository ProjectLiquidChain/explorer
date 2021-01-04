import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionPagination } from "@/components/transaction/pagination/pagination";
import { TransactionBundle } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	context
) => {
	const page: number = (() => {
		const query = context.query.page ?? "1";
		const page = Array.isArray(query) ? query[0] : query;
		return parseInt(page) - 1;
	})();

	try {
		const result = await getRecentTransactions({ page });
		const { transactions, totalPages } = result;
		const props: Props = { transactions, totalPages, page };
		return { props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { props: { hasError: true, error } };
	}
};

export default TransactionIndexPage;
