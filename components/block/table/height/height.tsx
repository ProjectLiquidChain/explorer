import { Icon, text } from "@moai/core";
import { ChevronRight } from "@moai/icon/hrs";
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
		<Icon display="inline" size={16} path={ChevronRight} />
	</span>
);

export const BlockTableHeight = ({ block, showDot }: Props): JSX.Element => {
	const [recent, setRecent] = useState(true);
	useEffect(() => {
		window.setTimeout(() => setRecent(false), 1000);
	}, []);
	return (
		<div>
			<BlockHeight value={block.height} />
			{showDot && <Dot recent={recent} />}
		</div>
	);
};
