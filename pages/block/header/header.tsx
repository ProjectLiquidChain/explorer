import { Number } from "@/components/number/number";
import { Block } from "@/models/block";
import { Button, ButtonGroup, DivGrow, DivPx, text } from "@moai/core";
import { icons } from "@moai/icon";
import Link from "next/link";
import s from "./header.module.css";

interface Props {
	height: Block["height"];
}

const Navigation = ({ height }: Props) => (
	<ButtonGroup skipChildTypeCheck>
		<Link href={`/block/${height - 1}`}>
			<Button.Forwarded icon={icons.chevronLeft} style={Button.style.outset} />
		</Link>
		<Link href={`/block/${height + 1}`}>
			<Button.Forwarded icon={icons.chevronRight} style={Button.style.outset} />
		</Link>
	</ButtonGroup>
);

export const BlockHeader = ({ height }: Props) => (
	<div className={s.container}>
		<div>
			<div className={[].join(" ")}>Block</div>
			<DivPx size={8} />
			<h1 className={[s.title, text.strong].join(" ")}>
				<Number format="integer" value={height} />
			</h1>
		</div>
		<DivGrow />
		<Navigation height={height} />
	</div>
);
