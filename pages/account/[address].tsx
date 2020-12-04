import { Account, isUserAccount } from "@/components/account/account";
import * as fetchAccount from "@/components/account/fetch/fetch";
import { AccountHeader } from "@/components/account/header/header";
import { AccountOverview } from "@/components/account/overview/overview";
import { Asset } from "@/components/asset/asset";
import { AssetTable } from "@/components/asset/table/table";
import { container } from "@/components/container/container";
import { Contract } from "@/components/contract/contract";
import { getContract } from "@/components/contract/fetch/fetch";
import { ContractOverview } from "@/components/contract/overview/overview";
import { Heading } from "@/components/heading/heading";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Receipt } from "@/components/receipt/receipt";
import { TransactionTable } from "@/components/transaction/table/table";
import { Transaction } from "@/components/transaction/transaction";
import { TransferTable } from "@/components/transfer/table/table";
import { Transfer } from "@/components/transfer/transfer";
import { DivPx, Tab, Tabs } from "@moai/core";
import { Pane } from "@moai/core";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
	account: Account;
	contract: Contract | null;
	transactions: Transaction[];
	receipts: Receipt[];
	assets: Asset[];
	transfers: Transfer[];
}

type PageProps = PageErrorProps<Props>;

const getTabs = (props: Props): Tab[] => [
	{
		title: "Transactions",
		pane: () => (
			<TransactionTable
				transactions={props.transactions}
				receipts={props.receipts}
			/>
		),
	},
	{
		title: "Transfers",
		pane: () => <TransferTable transfers={props.transfers} />,
	},
];

const AccountBody = (props: Props): JSX.Element => (
	<div className={container.max960}>
		<AccountHeader account={props.account} />
		<AccountOverview account={props.account} />
		{props.contract && (
			<>
				<DivPx size={16} />
				<ContractOverview contract={props.contract} />
			</>
		)}

		<DivPx size={16} />
		<Heading children="Assets" />
		<Pane noPadding>
			<AssetTable assets={props.assets} />
		</Pane>

		<DivPx size={16} />
		<Heading children="Recent Activitie" />
		<Tabs children={getTabs(props)} noPadding />
	</div>
);

const AccountPage = (page: PageProps) => (
	<Page
		title={(p) => `Liquid Account ${p.account.address}`}
		description={(p) =>
			`See details of account ${p.account.address} on Liquid Blockchain Explorer`
		}
		page={page}
		Body={AccountBody}
	/>
);

const getPromiseValue = <T,>(promise: PromiseSettledResult<T>) => {
	if (promise.status === "fulfilled") return promise.value;
	throw Error("Failed to fetch");
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	let props: PageProps;
	try {
		const { address } = context.params ?? {};
		if (typeof address !== "string") throw Error("Address is not defined");

		// Request all to save time, since they are independent. It is ok for
		// the 2nd to fail (when the account turns out to be a User account)
		const result = await Promise.allSettled([
			fetchAccount.getAccount(address),
			getContract(address),
			fetchAccount.getAccountTransactions(address),
			fetchAccount.getAccountAssets(address),
			fetchAccount.getAccountTransfers(address),
		]);

		const account = getPromiseValue(result[0]);
		if (account === null) throw Error("Account not found");

		const contract = (() => {
			if (isUserAccount(account)) return null;
			if (result[1].status === "fulfilled") return result[1].value;
			throw Error("Contract not found");
		})();

		props = {
			hasError: false,
			account,
			contract,
			transactions: getPromiseValue(result[2]).transactions,
			receipts: getPromiseValue(result[2]).receipts,
			assets: getPromiseValue(result[3]),
			transfers: getPromiseValue(result[4]),
		};
	} catch (error) {
		props = { hasError: true, error: error.message };
	}
	return { revalidate: 1, props };
};

export const getStaticPaths: GetStaticPaths = async () => ({
	fallback: "blocking",
	paths: [],
});

export default AccountPage;
