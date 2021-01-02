import * as Transaction from "@/components/transaction/transaction";
import * as Transfer from "@/components/transfer/transfer";
import { Tab, Tabs } from "@moai/core";
import { Account } from "../account";
import { AccountActivitiesTransactions } from "./transactions/transactions";
import { AccountActivitiesTransfers } from "./transfers/transfers";

export interface AccountActivitiesProps {
	address: Account["address"];
	transactionPages: number;
	transactions: Transaction.TransactionBundle[];
	transferPages: number;
	transfers: Transfer.Transfer[];
}

const getTabs = (props: AccountActivitiesProps): Tab[] => [
	{
		id: "transactions",
		title: "Transactions",
		pane: () => (
			<AccountActivitiesTransactions
				address={props.address}
				totalPages={props.transactionPages}
				transactions={props.transactions}
			/>
		),
	},
	{
		id: "transfers",
		title: "Transfers",
		pane: () => (
			<AccountActivitiesTransfers
				address={props.address}
				totalPages={props.transferPages}
				transfers={props.transfers}
			/>
		),
	},
];

export const AccountActivities = (
	props: AccountActivitiesProps
): JSX.Element => (
	<Tabs
		children={getTabs(props)}
		initialTab={props.transactions.length !== 0 ? "transactions" : "transfers"}
		noPadding
	/>
);
