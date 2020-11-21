import { AccountAddress } from "@/components/account/address/address";
import { ArgumentTable } from "@/components/argument/table/table";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Pane } from "@/components/pane/pane";
import { Border, DivPx } from "@moai/core";
import { Receipt } from "../receipt";
import s from "./event.module.css";

interface Props {
	event: Receipt["events"][0];
}

export const ReceiptEvent = ({ event }: Props) => (
	<Pane>
		<Info label="Event name" children={event.name} />
		<Divider />
		<Info
			label="Contract"
			children={<AccountAddress wrap value={event.contract} />}
		/>
		<DivPx size={32} />
		<div className={s.table}>
			<Border color="weak" />
			<ArgumentTable args={event.args} />
		</div>
	</Pane>
);
