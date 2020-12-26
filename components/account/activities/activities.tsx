import { formatNumber } from "@/components/numeric/numeric";
import { Receipt } from "@/components/receipt/receipt";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import * as Transaction from "@/components/transaction/transaction";
import { TransferTable } from "@/components/transfer/table/table";
import * as Transfer from "@/components/transfer/transfer";
import { Border, Tab, Tabs } from "@moai/core";
import s from "./activities.module.css";

interface PaneProps {
	count: number;
	pluralize: (count: number) => string;
	children: React.ReactNode;
}

const Pane = ({ count, pluralize, children }: PaneProps): JSX.Element => (
	<div>
		<div className={s.info}>
			{count} recent {pluralize(count)}
		</div>
		{count > 0 && (
			<>
				<Border color="weak" />
				{children}
			</>
		)}
	</div>
);

export interface AccountActivitiesProps {
	transactionPages: number;
	transactions: Transaction.CompletedTransaction[];
	transferPages: number;
	transfers: Transfer.Transfer[];
}

const getEstimated = (pages: number, first: number): string => {
	if (pages === 0) return "0";
	if (pages === 1) return `${first}`;
	const value = (pages - 1) * 100;
	const text = formatNumber({ type: "integer", value });
	return `${text}+`;
};

const getTransactionTab = (props: AccountActivitiesProps): Tab => {
	const count = props.transactions.length;
	return {
		id: "transactions",
		title: `Transactions (${getEstimated(props.transactionPages, count)})`,
		pane: () => (
			<Pane count={count} pluralize={Transaction.pluralizeTransaction}>
				<TransactionTableWide transactions={props.transactions} />
			</Pane>
		),
	};
};

const getTransferTab = (props: AccountActivitiesProps): Tab => {
	const count = props.transfers.length;
	return {
		id: "transfers",
		title: `Transfers (${getEstimated(props.transferPages, count)})`,
		pane: () => (
			<Pane count={count} pluralize={Transfer.pluralizeTransfer}>
				<TransferTable transfers={props.transfers} />
			</Pane>
		),
	};
};

export const AccountActivities = (
	props: AccountActivitiesProps
): JSX.Element => (
	<Tabs
		children={[getTransactionTab(props), getTransferTab(props)]}
		initialTab={props.transactions.length !== 0 ? "transactions" : "transfers"}
		noPadding
	/>
);
