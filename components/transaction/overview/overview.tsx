import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@/components/pane/pane";
import { Transaction } from "@/models/transaction";
import { Border, DivPx, Tag, text } from "@moai/core";
import Link from "next/link";
import s from "./overview.module.css";

interface Props {
	transaction: Transaction;
}

const Divider = () => (
	<>
		<DivPx size={16} />
		<Border color="weak" />
		<DivPx size={16} />
	</>
);

const linkCls = [s.link, text.highlight].join(" ");

export const TransactionOverview = ({ transaction }: Props) => (
	<Pane>
		<Info label="Type">
			<span className={s.tag}>
				<Tag children={transaction.type} />
			</span>
		</Info>
		<Divider />
		<Info label="Block">
			<Link href={`/block/${transaction.height}`}>
				<a className={linkCls}>
					<Numeric format="integer" value={transaction.height} />
				</a>
			</Link>
		</Info>
		<Divider />
		<Info
			label="From"
			help="The sending party of the transaction (a User account)"
			copy={transaction.sender}
		>
			<Link href={`/account/${transaction.sender}`}>
				<a className={[linkCls, s.hash].join(" ")}>{transaction.sender}</a>
			</Link>
		</Info>
		<Divider />
		<Info
			label="To"
			help="The receiving party of the transaction (a Contract address)"
			copy={transaction.receiver}
		>
			<Link href={`/account/${transaction.receiver}`}>
				<a className={[linkCls, s.hash].join(" ")}>{transaction.receiver}</a>
			</Link>
		</Info>
		<Divider />
		<Info
			label="Signature"
			help="Signature of the transaction's sender"
			copy={transaction.signature}
		>
			<span className={s.hash}>{transaction.signature}</span>
		</Info>
		<Divider />
		<Info
			label="Nonce"
			help="Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be the 11th transaction sent from the sender's address."
		>
			<Numeric format="integer" value={transaction.nonce} />
		</Info>
		<Divider />
		<Info
			label="Gas limit"
			help="Maximum amount of gas provided for the transaction. Zero means unlimited."
		>
			<Numeric format="integer" value={transaction.gasLimit} />
		</Info>
		<Divider />
		<Info label="Gas price">
			<Numeric format="integer" value={transaction.gasPrice} />
		</Info>
	</Pane>
);
