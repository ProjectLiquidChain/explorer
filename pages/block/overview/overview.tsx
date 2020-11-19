import { Info } from "@/components/info/info";
import { Numeric } from "@/components/number/number";
import { Pane } from "@/components/pane/pane";
import { Time } from "@/components/time/time";
import { Block } from "@/models/block";
import { Border, DivPx } from "@moai/core";
import s from "./overview.module.css";

interface Props {
	block: Block;
}

const Divider = () => (
	<>
		<DivPx size={16} />
		<Border color="weak" />
		<DivPx size={16} />
	</>
);

export const BlockOverview = ({ block }: Props) => (
	<Pane>
		<Info
			label="Height"
			help="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
		>
			<Numeric format="integer" value={block.height} />
		</Info>
		<Divider />
		<Info label="Transactions">
			<Numeric format="integer" value={block.transactions.length} />
			<span> transaction(s) in this block</span>
		</Info>
		<Divider />
		<Info label="Time" help="The date and time at which a block is proposed.">
			<Time value={block.time * 1000} format="relative" />
			<span> — </span>
			<Time value={block.time * 1000} format="long" />
		</Info>
		<Divider />
		<Info label="Hash" help="The hash of this block" copy={block.hash}>
			<span className={s.hash}>{block.hash}</span>
		</Info>
		<Divider />
		<Info
			label="Parent"
			help="The hash of the parent of this block"
			copy={block.hash}
		>
			<span className={s.hash}>{block.parent}</span>
		</Info>
		<Divider />
		<Info label="State root" copy={block.stateRoot}>
			<span className={s.hash}>{block.stateRoot}</span>
		</Info>
	</Pane>
);
