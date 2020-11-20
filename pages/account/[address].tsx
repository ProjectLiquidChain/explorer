import { AccountHeader } from "@/components/account/header/header";
import { AccountOverview } from "@/components/account/overview/overview";
import { container } from "@/components/container/container";
import { ContractOverview } from "@/components/contract/contract";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Account, getAccount, isUserAccount } from "@/models/account";
import { Contract, getContract } from "@/models/contract";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

interface Props {
	account: Account;
	contract: Contract | null;
}

type PageProps = PageErrorProps<Props>;

const AccountBody = ({ account, contract }: Props) => (
	<div className={container.max960}>
		<AccountHeader account={account} />
		<AccountOverview account={account} />
		{contract && <ContractOverview contract={contract} />}
	</div>
);

const AccountPage = (page: PageProps) => (
	<Page page={page} Body={AccountBody} />
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	context
) => {
	try {
		const { address } = context.query;
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

		return { props: { hasError: false, account, contract } };
	} catch (error) {
		return { props: { hasError: true, error: error.message } };
	}
};

export default AccountPage;
