import { Icon, text } from "@moai/core";
import { icons } from "@moai/icon";
import { useEffect, useState } from "react";
import { Block } from "../../block";
import { BlockHeight } from "../../height/height";
import s from "./height.module.css";

interface Props {
	block: Block;
}

const Dot = ({ recent }: { recent: boolean }): JSX.Element => (
	<span className={[text.blueStrong, recent ? s.show : s.hide].join(" ")}>
		<Icon display="inline" size={16} path={icons.dot} />
	</span>
);

export const BlockTableHeight = ({ block }: Props): JSX.Element => {
	const [recent, setRecent] = useState(true);
	useEffect(() => {
		window.setTimeout(() => setRecent(false), 1000);
	}, []);
	return (
		<div>
			<BlockHeight value={block.height} />
			<Dot recent={recent} />
		</div>
	);
};
