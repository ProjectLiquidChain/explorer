import { container } from "@/components/container/container";
import { Heading } from "@/components/heading/heading";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { ReceiptOverview } from "@/components/receipt/overview/overview";
import { Receipt } from "@/components/receipt/receipt";
import { getTransaction } from "@/components/transaction/fetch/fetch";
import { TransactionHeader } from "@/components/transaction/header/header";
import { TransactionOverview } from "@/components/transaction/overview/overview";
import { TransactionPayload } from "@/components/transaction/payload/payload";
import { Transaction } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

interface Props {
	transaction: Transaction;
	receipt: Receipt;
}

type PageProps = PageErrorProps<Props>;

const TransactionBody = ({ transaction, receipt }: Props) => (
	<div className={container.max960}>
		<TransactionHeader transaction={transaction} />
		<TransactionOverview transaction={transaction} />
		<DivPx size={16} />
		<Heading>Transaction Payload</Heading>
		<TransactionPayload payload={transaction.payload} />
		<DivPx size={16} />
		<Heading>Transaction Receipt</Heading>
		<ReceiptOverview receipt={receipt} />
	</div>
);

const TransactionPage = (page: PageProps) => (
	<Page page={page} Body={TransactionBody} />
);

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: true,
});

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	try {
		const { hash } = context.params ?? {};
		if (typeof hash !== "string") throw Error("Hash is not defined");
		const { transaction, receipt } = await getTransaction(hash);
		return { props: { hasError: false, transaction, receipt } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export default TransactionPage;
