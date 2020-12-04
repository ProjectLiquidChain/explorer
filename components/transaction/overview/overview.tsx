import { AccountAddress } from "@/components/account/address/address";
import { BlockHeight } from "@/components/block/height/height";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@moai/core";
import { Transaction } from "@/components/transaction/transaction";
import { TransactionType } from "../type/type";

interface Props {
	transaction: Transaction;
}

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
			children={<AccountAddress wrap value={transaction.sender} />}
		/>
		<Divider />
		<Info
			label="To"
			help="The receiving party of the transaction (a Contract address)"
			copy={transaction.receiver}
			children={<AccountAddress wrap value={transaction.receiver} />}
		/>
		<Divider />
		<Info
			label="Signature"
			help="Signature of the transaction's sender"
			copy={transaction.signature}
			children={transaction.signature}
		/>
		<Divider />
		<Info
			label="Nonce"
			help="Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be the 11th transaction sent from the sender's address."
			children={<Numeric type="integer" value={transaction.nonce} />}
		/>
		<Divider />
		<Info
			label="Gas limit"
			help="Maximum amount of gas provided for the transaction. Zero means unlimited."
			children={<Numeric type="integer" value={transaction.gasLimit} />}
		/>
		<Divider />
		<Info
			label="Gas price"
			children={<Numeric type="integer" value={transaction.gasPrice} />}
		/>
	</Pane>
);
