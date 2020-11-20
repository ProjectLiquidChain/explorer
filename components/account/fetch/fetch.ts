import { serverCall, ServerCall } from "@/components/server/server";
import { Account, ContractAccount, UserAccount } from "../account";

export const getAccount: ServerCall<
	Account["address"],
	null | ContractAccount | UserAccount
> = async (address) => {
	const result = await serverCall("chain.GetAccount", { address });
	const account = result.account;
	account.address = address;
	return account;
};
