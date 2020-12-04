import { Receipt } from "@/components/receipt/receipt";
import { TransactionTable } from "@/components/transaction/table/table";
import * as Transaction from "@/components/transaction/transaction";
import { TransferTable } from "@/components/transfer/table/table";
import * as Transfer from "@/components/transfer/transfer";
import { Border, Tab, Tabs } from "@moai/core";
import s from "./activities.module.css";

interface PaneProps {
	count: number;
	models: string;
	children: React.ReactNode;
}

const Pane = ({ count, models, children }: PaneProps): JSX.Element => (
	<div>
		<div className={s.info}>
			{count} recent {models}
		</div>
		<Border color="weak" />
		{children}
	</div>
);

export interface AccountActivitiesProps {
	transactions: Transaction.Transaction[];
	receipts: Receipt[];
	transfers: Transfer.Transfer[];
}

const getTabs = (props: AccountActivitiesProps): Tab[] => [
	{
		title: "Transactions",
		pane: () => (
			<Pane
				count={props.transactions.length}
				models={Transaction.getTransactionPlural(props.transactions.length)}
			>
				<TransactionTable
					transactions={props.transactions}
					receipts={props.receipts}
				/>
			</Pane>
		),
	},
	{
		title: "Transfers",
		pane: () => (
			<Pane
				count={props.transfers.length}
				models={Transfer.getTranferPlural(props.transfers.length)}
			>
				<TransferTable transfers={props.transfers} />
			</Pane>
		),
	},
];

export const AccountActivities = (
	props: AccountActivitiesProps
): JSX.Element => <Tabs children={getTabs(props)} noPadding />;
