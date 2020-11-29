import { Token } from "../account/account";
import { Block } from "../block/block";
import { Address, Hash } from "../server/server";

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
