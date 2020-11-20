import { AccountAddress } from "@/components/account/address/address";
import { BlockHeight } from "@/components/block/height/height";
import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@/components/pane/pane";
import { Transaction } from "@/models/transaction";
import { Border, DivPx } from "@moai/core";
import { TransactionType } from "../type/type";
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

export const TransactionOverview = ({ transaction }: Props) => (
	<Pane>
		<Info label="Type">
			<TransactionType value={transaction.type} />
		</Info>
		<Divider />
		<Info label="Block">
			<BlockHeight value={transaction.height} />
		</Info>
		<Divider />
		<Info
			label="From"
			help="The sending party of the transaction (a User account)"
			copy={transaction.sender}
		>
			<span className={s.break}>
				<AccountAddress value={transaction.sender} />
			</span>
		</Info>
		<Divider />
		<div>{JSON.stringify(transaction.payload)}</div>
		<Info
			label="To"
			help="The receiving party of the transaction (a Contract address)"
			copy={transaction.receiver}
		>
			<span className={s.break}>
				<AccountAddress value={transaction.receiver} />
			</span>
		</Info>
		<Divider />
		<Info
			label="Signature"
			help="Signature of the transaction's sender"
			copy={transaction.signature}
		>
			<span className={s.break}>{transaction.signature}</span>
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
