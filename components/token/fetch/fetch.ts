import { serverCall, ServerCall } from "@/components/server/server";
import { Token } from "../token";

export const getTokens: ServerCall<undefined, Token[]> = async () => {
	const result = await serverCall("surf.GetTokens", undefined);
	return result.tokens;
};
