import { serverCall, ServerCall } from "@/components/server/server";
import { Receipt, Transaction } from "../transaction";

export const getTransaction: ServerCall<
	Transaction["hash"],
	{ transaction: Transaction; receipt: Receipt }
> = (hash) => {
	return serverCall("chain.GetTransaction", { hash });
};
