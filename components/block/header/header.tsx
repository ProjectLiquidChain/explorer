import { Block } from "@/components/block/block";
import { CopyButton } from "@/components/copy/copy";
import { Numeric } from "@/components/numeric/numeric";
import { Button, ButtonGroup, DivGrow, DivPx, text, Tooltip } from "@moai/core";
import Link from "next/link";
import s from "./header.module.css";
import { ChevronRight, ChevronLeft } from "@moai/icon/hrs";

interface Props {
	block: Block;
}

const Navigation = ({ block }: Props) => (
	<ButtonGroup skipChildTypeCheck>
		<Tooltip content="Go to parent (previous) block">
			<div>
				<Link href={`/block/${block.height - 1}`}>
					<Button.Forwarded
						icon={ChevronLeft}
						iconLabel="Go to parent (previous) block"
						style={Button.styles.outset}
					/>
				</Link>
			</div>
		</Tooltip>
		<Tooltip content="Go to child (next) block">
			<div>
				<Link href={`/block/${block.height + 1}`}>
					<Button.Forwarded
						icon={ChevronRight}
						iconLabel="Go to child (next) block"
						style={Button.styles.outset}
					/>
				</Link>
			</div>
		</Tooltip>
	</ButtonGroup>
);

export const BlockHeader = ({ block }: Props) => (
	<div className={s.container}>
		<div className={[text.strong].join(" ")}>
			<div className={[].join(" ")}>Block</div>
			<div className={s.title}>
				<h1 className={[s.titleText, text.strong].join(" ")}>
					<Numeric type="integer" value={block.height} />
				</h1>
				<DivPx size={8} />
				<CopyButton text={block.height.toString()} />
			</div>
		</div>
		<DivGrow />
		<Navigation block={block} />
	</div>
);
