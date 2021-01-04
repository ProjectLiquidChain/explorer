import { serverCall, ServerCall } from "@/components/server/server";
import { Transfer } from "../transfer";

export const getRecentTransfers: ServerCall<
	{ page: number },
	{ transfers: Transfer[]; totalPages: number }
> = async ({ page }) => {
	const options = { limit: 100, page: page };
	const result = await serverCall("surf.GetTransfers", options);
	const { transfers, totalPages } = result;
	return { transfers, totalPages };
};
