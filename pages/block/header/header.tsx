import { Numeric } from "@/components/number/number";
import { Block } from "@/models/block";
import { Button, ButtonGroup, DivGrow, DivPx, text } from "@moai/core";
import { icons } from "@moai/icon";
import Link from "next/link";
import s from "./header.module.css";

interface Props {
	block: Block;
}

const Navigation = ({ block }: Props) => (
	<ButtonGroup skipChildTypeCheck>
		<Link href={`/block/${block.height - 1}`}>
			<Button.Forwarded icon={icons.chevronLeft} style={Button.style.outset} />
		</Link>
		<Link href={`/block/${block.height + 1}`}>
			<Button.Forwarded icon={icons.chevronRight} style={Button.style.outset} />
		</Link>
	</ButtonGroup>
);

export const BlockHeader = ({ block }: Props) => (
	<div className={s.container}>
		<div className={[text.strong].join(" ")}>
			<div className={[].join(" ")}>Block</div>
			<DivPx size={8} />
			<h1 className={[s.title, text.strong].join(" ")}>
				<Numeric format="integer" value={block.height} />
			</h1>
		</div>
		<DivGrow />
		<Navigation block={block} />
	</div>
);
