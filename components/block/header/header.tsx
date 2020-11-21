import { Block } from "@/components/block/block";
import { CopyButton } from "@/components/copy/copy";
import { Numeric } from "@/components/numeric/numeric";
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
			<div className={s.title}>
				<h1 className={[s.titleText, text.strong].join(" ")}>
					<Numeric format="integer" value={block.height} />
				</h1>
				<DivPx size={8} />
				<CopyButton text={block.height.toString()} />
			</div>
		</div>
		<DivGrow />
		<Navigation block={block} />
	</div>
);
