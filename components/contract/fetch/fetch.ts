import { ContractAccount } from "@/components/account/account";
import { serverCall, ServerCall } from "@/components/server/server";
import { Contract } from "../contract";

export const getContract: ServerCall<
	ContractAccount["address"],
	Contract
> = async (address) => {
	const result = await serverCall("chain.GetContract", { address });
	return result.contract;
};
