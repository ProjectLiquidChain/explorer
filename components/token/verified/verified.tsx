import { Account } from "@/components/account/account";
import { Token } from "@/components/token/token";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getTokens } from "../fetch/fetch";

/*
This module allows us to mark addresses as "Verified". We intentionally use
context here so the list can be requested on client-side, without blocking
the render of our pages
*/

type TokenMap = Map<Account["address"], Token>;

export const VerifiedTokensContext = createContext<TokenMap>(new Map());

interface Props {
	children: ReactNode;
}

export const VerifiedTokensProvider = ({ children }: Props): JSX.Element => {
	const [tokens, setTokens] = useState<TokenMap>(new Map());

	useEffect(() => {
		(async () => {
			const list = await getTokens(undefined);
			const map = list.reduce((map, token) => {
				map.set(token.address, token);
				return map;
			}, new Map());
			setTokens(map);
		})();
	}, []);

	return <VerifiedTokensContext.Provider value={tokens} children={children} />;
};
