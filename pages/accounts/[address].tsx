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
import { toServerError } from "@/components/server/error";
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
			transactionPages={props.transactionPages}
			transfers={props.transfers}
			transferPages={props.transferPages}
		/>
	</div>
);

const AccountPage = (page: PageProps) => (
	<Page
		title={(p) => `Account ${p.account.address} - Liquid`}
		description={(p) =>
			`See details of account ${p.account.address} on Liquid Blockchain Explorer`
		}
		page={page}
		Body={AccountBody}
	/>
);

const getValue = <T,>(promise: PromiseSettledResult<T>): T => {
	if (promise.status === "fulfilled") return promise.value;
	throw promise.reason;
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
			fetchAccount.getAccountAssets(address),
			fetchAccount.getAccountTransactions(address),
			fetchAccount.getAccountTransfers(address),
		]);

		const account = getValue(result[0]);

		const contract = ((): Contract | null => {
			if (isUserAccount(account)) return null;
			if (result[1].status === "fulfilled") return result[1].value;
			throw result[1].reason;
		})();

		const assets = getValue(result[2]);
		const { transactionPages, transactions, receipts } = getValue(result[3]);
		const { transferPages, transfers } = getValue(result[4]);

		props = {
			hasError: false,
			...{ account, contract, assets },
			...{ transactions, transactionPages, receipts },
			...{ transfers, transferPages },
		};
	} catch (unknownError: unknown) {
		props = { hasError: true, error: toServerError(unknownError) };
	}
	return { revalidate: 1, props };
};

export const getStaticPaths: GetStaticPaths = async () => ({
	fallback: "blocking",
	paths: [],
});

export default AccountPage;
