import { CopyButton } from "@/components/copy/copy";
import { Numeric } from "@/components/numeric/numeric";
import { Account, isUserAccount } from "@/models/account";
import { Button, ButtonGroup, DivGrow, DivPx, text } from "@moai/core";
import { icons } from "@moai/icon";
import Link from "next/link";
import s from "./header.module.css";

interface Props {
	account: Account;
}

export const AccountHeader = ({ account }: Props) => (
	<div className={[s.container, text.strong].join(" ")}>
		<div>{isUserAccount(account) ? "User Account" : "Contract Account"}</div>
		<DivPx size={4} />
		<div className={s.title}>
			<h1 className={s.address}>{account.address}</h1>
			<DivPx size={8} />
			<CopyButton text={account.address.toString()} />
		</div>
	</div>
);
