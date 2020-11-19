import { CopyButton } from "@/components/copy/copy";
import { Transaction } from "@/models/transaction";
import { DivPx, text } from "@moai/core";
import s from "./header.module.css";

interface Props {
	transaction: Transaction;
}

export const TransactionHeader = ({ transaction }: Props) => (
	<div className={[s.container, text.strong].join(" ")}>
		<div>Transaction</div>
		<DivPx size={4} />
		<div className={s.title}>
			<h1 className={s.address}>{transaction.hash}</h1>
			<DivPx size={8} />
			<CopyButton text={transaction.hash} />
		</div>
	</div>
);
