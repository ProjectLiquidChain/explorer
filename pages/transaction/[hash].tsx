import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { TransactionHeader } from "@/components/transaction/header/header";
import { TransactionOverview } from "@/components/transaction/overview/overview";
import { TransactionReceipt } from "@/components/transaction/receipt/receipt";
import { getTransaction, Receipt, Transaction } from "@/models/transaction";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

interface Props {
	transaction: Transaction;
	receipt: Receipt;
}

type PageProps = PageErrorProps<Props>;

const TransactionBody = ({ transaction, receipt }: Props) => (
	<div className={container.max960}>
		<TransactionHeader transaction={transaction} />
		<TransactionOverview transaction={transaction} />
		<TransactionReceipt receipt={receipt} />
		<DivPx size={32} />
	</div>
);

const TransactionPage = (page: PageProps) => (
	<Page page={page} Body={TransactionBody} />
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	context
) => {
	try {
		const { hash } = context.query;
		if (typeof hash !== "string") throw Error("Hash is not defined");
		const { transaction, receipt } = await getTransaction(hash);
		return { props: { hasError: false, transaction, receipt } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export default TransactionPage;
