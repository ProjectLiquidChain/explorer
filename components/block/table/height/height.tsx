import { coreIcons, Icon, text } from "@moai/core";
import { useEffect, useState } from "react";
import { Block } from "../../block";
import { BlockHeight } from "../../height/height";
import s from "./height.module.css";

interface Props {
	block: Block;
	showDot: boolean;
}

const Dot = ({ recent }: { recent: boolean }): JSX.Element => (
	<span className={[text.highlightStrong, recent ? s.show : s.hide].join(" ")}>
		<Icon display="inline" size={16} path={coreIcons.dot} />
	</span>
);

export const BlockTableHeight = ({ block, showDot }: Props): JSX.Element => {
	const [recent, setRecent] = useState(true);
	useEffect(() => {
		const timer = window.setTimeout(() => setRecent(false), 1000);
		return () => window.clearTimeout(timer);
	}, []);
	return (
		<div>
			<BlockHeight value={block.height} />
			{showDot && <Dot recent={recent} />}
		</div>
	);
};
