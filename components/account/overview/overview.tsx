import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@/components/pane/pane";
import { Account, isContractAccount } from "@/models/account";
import { Border, Button, DivPx, text } from "@moai/core";
import Link from "next/link";
import s from "./overview.module.css";

interface Props {
	account: Account;
}

const Divider = () => (
	<>
		<DivPx size={16} />
		<Border color="weak" />
		<DivPx size={16} />
	</>
);

export const AccountOverview = ({ account }: Props) => (
	<Pane>
		{isContractAccount(account) && (
			<>
				<Info label="Contract hash" copy={account.contractHash}>
					<span className={s.hash}>{account.contractHash}</span>
				</Info>
				<DivPx size={16} />
				<Link href={`/contract/${account.address}`}>
					<Button highlight>View Contract</Button>
				</Link>
				<Divider />
			</>
		)}
		<Info
			label="Account Nonce"
			help="Sequential running number of this address, beginning with 0 for the first transaction. For example, if the nonce is 10, the address has sent 11 transactions."
		>
			<Numeric format="integer" value={account.nonce} />
		</Info>
		<Divider />
		<Info label="Account creator" copy={account.creator}>
			<Link href={`/account/${account.creator}`}>
				<a className={[text.highlight, s.link, s.hash].join(" ")}>
					{account.creator}
				</a>
			</Link>
		</Info>
		<Divider />
		<Info label="Storage hash" copy={account.storageHash}>
			<span className={s.hash}>{account.storageHash}</span>
		</Info>
	</Pane>
);
