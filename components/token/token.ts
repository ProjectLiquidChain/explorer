import { Account } from "../account/account";

export interface Token {
	address: Account["address"];
	currency: string;
	decimals: number;
}
