import { CopyButton } from "@/components/copy/copy";
import { DivPx, text } from "@moai/core";
import { Account, isUserAccount } from "../account";
import s from "./header.module.css";

interface Props {
	account: Account;
}

export const AccountHeader = ({ account }: Props) => (
	<div className={[s.container, text.strong].join(" ")}>
		<div>{isUserAccount(account) ? "User Account" : "Contract Account"}</div>
		<div className={s.title}>
			<h1 className={s.address} children={account.address} />
			<DivPx size={8} />
			<CopyButton text={account.address.toString()} />
		</div>
	</div>
);
