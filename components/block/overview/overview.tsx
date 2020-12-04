import { Block } from "@/components/block/block";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@moai/pane/pane";
import { Time } from "@/components/time/time";

interface Props {
	block: Block;
}

const TransactionsCount = ({ block }: Props): JSX.Element => {
	const len = block.transactions.length;
	return (
		<span>
			<Numeric type="integer" value={len} />
			<span> {len > 1 ? "transactions" : "transaction"} </span>
			<span>in this block</span>
		</span>
	);
};

export const BlockOverview = ({ block }: Props) => (
	<Pane>
		<Info
			label="Height"
			help="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
		>
			<Numeric type="integer" value={block.height} />
		</Info>
		<Divider />
		<Info label="Transactions" children={<TransactionsCount block={block} />} />
		<Divider />
		<Info label="Time" help="The date and time at which a block is proposed.">
			<Time value={block.time * 1000} format="relative" />
			<span> — </span>
			<Time value={block.time * 1000} format="long" />
		</Info>
		<Divider />
		<Info
			label="Hash"
			help="The hash of this block"
			copy={block.hash}
			children={block.hash}
		/>
		<Divider />
		<Info
			label="Parent"
			help="The hash of the parent of this block"
			copy={block.hash}
			children={block.parent}
		/>
		<Divider />
		<Info
			label="State root"
			copy={block.stateRoot}
			children={block.stateRoot}
		/>
	</Pane>
);
