import { Block } from "../block/block";
import { Address, Hash } from "../server/server";
import { Token } from "../token/token";

export interface Transfer {
	index: number;
	amount: string;
	memo: string;
	transaction: {
		block: Block["height"];
		hash: Hash;
	};
	from: { address: Address };
	to: { address: Address };
	token: Token;
}

export const getTranferPlural = (count: number): string =>
	count > 1 ? "tranfers" : "transfer";
