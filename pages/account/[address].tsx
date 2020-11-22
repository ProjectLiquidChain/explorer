import { Account, isUserAccount } from "@/components/account/account";
import { getAccount } from "@/components/account/fetch/fetch";
import { AccountHeader } from "@/components/account/header/header";
import { AccountOverview } from "@/components/account/overview/overview";
import { container } from "@/components/container/container";
import { Contract } from "@/components/contract/contract";
import { getContract } from "@/components/contract/fetch/fetch";
import { ContractOverview } from "@/components/contract/overview/overview";
import { Heading } from "@/components/heading/heading";
// import { ContractOverview } from "@/components/contract/contract";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { DivPx } from "@moai/core";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

interface Props {
	account: Account;
	contract: Contract | null;
}

type PageProps = PageErrorProps<Props>;

const AccountBody = ({ account, contract }: Props) => (
	<div className={container.max960}>
		<AccountHeader account={account} />
		<AccountOverview account={account} />
		{contract && (
			<>
				<DivPx size={16} />
				<ContractOverview contract={contract} />
			</>
		)}
	</div>
);

const AccountPage = (page: PageProps) => (
	<Page
		title={(p) => `Liquid Account #${p.account.address}`}
		description={(p) =>
			`See details of account ${p.account.address} on Liquid Blockchain Explorer`
		}
		page={page}
		Body={AccountBody}
	/>
);

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	let props: PageProps;
	try {
		const { address } = context.params ?? {};
		if (typeof address !== "string") throw Error("Address is not defined");

		// Request both to save time, since they are independent. However the
		// 2nd may fail when the account turns out to be a User account
		const result = await Promise.allSettled([
			getAccount(address),
			getContract(address),
		]);

		if (result[0].status === "rejected") throw Error("Account not found");
		const account = result[0].value;
		if (account === null) throw Error("Account not found");

		const contract = (() => {
			if (isUserAccount(account)) return null;
			if (result[1].status === "fulfilled") return result[1].value;
			throw Error("Contract not found");
		})();

		props = { hasError: false, account, contract };
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
