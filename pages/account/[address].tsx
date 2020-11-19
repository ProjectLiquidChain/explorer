import { AccountHeader } from "@/components/account/header/header";
import { AccountOverview } from "@/components/account/overview/overview";
import { container } from "@/components/container/container";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Account, getAccount } from "@/models/account";
import { DivPx } from "@moai/core";
import { GetServerSideProps } from "next";

interface Props {
	account: Account;
}

type PageProps = PageErrorProps<Props>;

const AccountBody = ({ account }: Props) => (
	<div className={container.max960}>
		<AccountHeader account={account} />
		<AccountOverview account={account} />
		<DivPx size={32} />
	</div>
);

const AccountPage = (page: PageProps) => (
	<Page page={page} Body={AccountBody} />
);

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const { address } = context.query;
	if (typeof address !== "string") throw Error("Address is not defined");
	const account = await getAccount(address);
	if (account === null) throw Error("Account not found");
	return { props: { account } };
};

export default AccountPage;
