import { Transaction } from "@/components/transaction/transaction";
import { Tag } from "@moai/core";
import s from "./type.module.css";

interface Props {
	value: Transaction["type"];
}

export const TransactionType = ({ value }: Props) => (
	<div className={s.container}>
		<Tag type={Tag.types.neutral} children={value} />
	</div>
);
