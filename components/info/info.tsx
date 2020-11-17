import { DivPx, text } from "@moai/core";
import s from "./info.module.css";

interface Props {
	label: string;
	children: React.ReactNode;
	help?: string;
}

export const Info = (props: Props) => (
	<div className={s.container}>
		<dt className={[text.strong].join(" ")}>{props.label}</dt>
		<DivPx size={8} />
		<dd>{props.children}</dd>
	</div>
);
