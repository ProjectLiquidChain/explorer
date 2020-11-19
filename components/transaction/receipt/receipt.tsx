import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@/components/pane/pane";
import { Receipt } from "@/models/transaction";
import { Border, DivPx, text } from "@moai/core";
import { TransactionCalls } from "../calls/calls";
import s from "./receipt.module.css";

interface Props {
	receipt: Receipt;
}

const Divider = () => (
	<>
		<DivPx size={16} />
		<Border color="weak" />
		<DivPx size={16} />
	</>
);

export const TransactionReceipt = ({ receipt }: Props) => (
	<div>
		<DivPx size={32} />
		<h2 className={[s.heading, text.strong].join(" ")}>Transaction Receipt</h2>
		<DivPx size={16} />
		<Pane>
			<Info label="Result">{receipt.result}</Info>
			<Divider />
			<Info label="Code">{receipt.code}</Info>
			<Divider />
			<Info label="Post state" copy={receipt.postState}>
				<span className={s.hash}>{receipt.postState}</span>
			</Info>
			<Divider />
			<Info label="Gas used">
				<Numeric format="integer" value={receipt.gasUsed} />
			</Info>
			<Info label="Gas used">
				<Numeric format="integer" value={receipt.gasUsed} />
			</Info>
		</Pane>
		<DivPx size={32} />
		<h2 className={[s.heading, text.strong].join(" ")}>Events</h2>
		<DivPx size={16} />
		<Pane>
			<TransactionCalls calls={receipt.events} />
		</Pane>
	</div>
);
