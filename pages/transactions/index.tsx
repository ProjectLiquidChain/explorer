import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Receipt } from "@/components/receipt/receipt";
import { toServerError } from "@/components/server/error";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionPagination } from "@/components/transaction/pagination/pagination";
import { Transaction } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

interface Props {
	transactions: Transaction[];
	receipts: Receipt[];
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
			receipts={props.receipts}
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
		const query = context.query.page ?? "0";
		const page = Array.isArray(query) ? query[0] : query;
		return parseInt(page);
	})();

	try {
		const result = await getRecentTransactions({ page });
		const { transactions, receipts, totalPages } = result;
		const props: Props = { transactions, receipts, totalPages, page };
		return { props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { props: { hasError: true, error } };
	}
};

export default TransactionIndexPage;
