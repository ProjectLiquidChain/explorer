import { container } from "@/components/container/container";
import { Heading } from "@/components/heading/heading";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { ReceiptEvent } from "@/components/receipt/event/event";
import { ReceiptOverview } from "@/components/receipt/overview/overview";
import { toServerError } from "@/components/server/error";
import { getTransaction } from "@/components/transaction/fetch/fetch";
import { TransactionHeader } from "@/components/transaction/header/header";
import { TransactionOverview } from "@/components/transaction/overview/overview";
import { TransactionPayload } from "@/components/transaction/payload/payload";
import { CompletedTransaction } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";

interface Props {
	transaction: CompletedTransaction;
}

type PageProps = PageErrorProps<Props>;

const TransactionBody = ({ transaction }: Props) => (
	<div className={container.max960}>
		<TransactionHeader transaction={transaction} />
		<TransactionOverview transaction={transaction} />
		<DivPx size={16} />
		<Heading>Invoke Payload</Heading>
		<TransactionPayload payload={transaction.payload} />
		<DivPx size={16} />
		<Heading>Transaction Receipt</Heading>
		<ReceiptOverview receipt={transaction.receipt} />
		<DivPx size={16} />
		<Heading>Receipt events</Heading>
		{transaction.receipt.events.map((event, index) => (
			<Fragment key={index}>
				{index > 0 && <DivPx size={32} />}
				<ReceiptEvent event={event} />
			</Fragment>
		))}
	</div>
);

const TransactionPage = (page: PageProps) => (
	<Page
		title={(p) => `Transaction ${p.transaction.hash} - Liquid`}
		description={(p) =>
			`See details of transaction ${p.transaction.hash} on Liquid Blockchain Explorer`
		}
		page={page}
		Body={TransactionBody}
	/>
);

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	try {
		const { hash } = context.params ?? {};
		if (typeof hash !== "string") throw Error("Hash is not defined");
		const transaction = await getTransaction(hash);
		return {
			// If the transaction exists then it won't change
			revalidate: undefined,
			props: { hasError: false, transaction },
		};
	} catch (error: unknown) {
		return {
			// The transaction does not exist yet but may be in the future
			revalidate: 1,
			props: { hasError: true, error: toServerError(error) },
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});

export default TransactionPage;
