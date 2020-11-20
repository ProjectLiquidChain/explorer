import { Transaction } from "@/components/transaction/transaction";
import { Tag } from "@moai/core";
import s from "./address.module.css";

interface Props {
	value: Transaction["type"];
}

export const TransactionType = ({ value }: Props) => (
	<div className={s.container}>
		<Tag children={value} />
	</div>
);
