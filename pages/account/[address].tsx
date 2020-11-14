import { Account, getAccount, isUserAccount } from "@/models/account";
import { GetServerSideProps } from "next";

interface Props {
	account: Account;
}

const AccountPage = (props: Props) => {
	return (
		<div>
			<div style={{ whiteSpace: "pre" }}>
				{JSON.stringify(props.account, undefined, 2)}
			</div>
			<div>Is user account: {isUserAccount(props.account) ? "yes" : "no"}</div>
		</div>
	);
};

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
