import { Account, isUserAccount } from "@/components/account/account";
import {
	AccountActivities,
	AccountActivitiesProps,
} from "@/components/account/activities/activities";
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
import { DivPx, Pane } from "@moai/core";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props extends AccountActivitiesProps {
	account: Account;
	contract: Contract | null;
	assets: Asset[];
}

type PageProps = PageErrorProps<Props>;

const AccountBody = (props: Props): JSX.Element => (
	<div className={container.max960}>
		<AccountHeader account={props.account} />
		<AccountOverview account={props.account} />

		{props.contract && (
			<>
				<DivPx size={16} />
				<Heading children="Contract" />
				<ContractOverview contract={props.contract} />
			</>
		)}

		<DivPx size={16} />
		<Heading children="Assets" />
		<Pane noPadding>
			<AssetTable assets={props.assets} />
		</Pane>

		<DivPx size={16} />
		<Heading children="Recent Activities" />
		<AccountActivities
			receipts={props.receipts}
			transactions={props.transactions}
			transfers={props.transfers}
		/>
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

const getPromiseValue = <T,>(
	model: string,
	promise: PromiseSettledResult<T>
): T => {
	if (promise.status === "fulfilled") return promise.value;
	throw Error(`Failed to fetch ${model}: ${promise.reason}`);
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

		const account = getPromiseValue("account", result[0]);
		if (account === null) throw Error("Account is not created");

		const contract = ((): Contract | null => {
			if (isUserAccount(account)) return null;
			if (result[1].status === "fulfilled") return result[1].value;
			throw Error("Contract not found");
		})();

		props = {
			hasError: false,
			account,
			contract,
			transactions: getPromiseValue("transactions", result[2]).transactions,
			receipts: getPromiseValue("receipts", result[2]).receipts,
			assets: getPromiseValue("assets", result[3]),
			transfers: getPromiseValue("transfers", result[4]),
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
