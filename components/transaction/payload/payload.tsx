import { ArgumentTable } from "@/components/argument/table/table";
import { Info } from "@/components/info/info";
import { Pane } from "@/components/pane/pane";
import { Transaction } from "@/components/transaction/transaction";
import { Border, DivPx } from "@moai/core";
import s from "./payload.module.css";

interface Props {
	payload: Transaction["payload"];
}

export const TransactionPayload = ({ payload }: Props) => (
	<Pane>
		<Info label="Payload name" children={payload.name} />
		<DivPx size={32} />
		<div className={s.table}>
			<Border color="weak" />
			<ArgumentTable args={payload.args} />
		</div>
	</Pane>
);
