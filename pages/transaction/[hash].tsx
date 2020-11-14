import { getTransaction, Receipt, Transaction } from "@/models/transaction";
import { GetServerSideProps } from "next";

interface Props {
	transaction: Transaction;
	receipt: Receipt;
}

const TransactionPage = (props: Props) => {
	return (
		<div style={{ whiteSpace: "pre" }}>
			{JSON.stringify(props.transaction, undefined, 2)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const { hash } = context.query;
	if (typeof hash !== "string") throw Error("Address is not defined");
	const { transaction, receipt } = await getTransaction(hash);
	return { props: { transaction, receipt } };
};

export default TransactionPage;
