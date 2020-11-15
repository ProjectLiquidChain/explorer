import { Block } from "@/models/block";
import { DivPx, Strong, text } from "@moai/core";
import s from "./header.module.css";

interface Props {
	height: Block["height"];
}

export const BlockHeader = (props: Props) => (
	<div className={s.container}>
		<div className={[].join(" ")}>Block</div>
		<DivPx size={8} />
		<h1 className={[s.title, text.strong].join(" ")}>{props.height}</h1>
	</div>
);
