import { DivPx, Icon, text, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
import { CopyButton } from "../../copy/copy";
import s from "./info.module.css";

export interface InfoProps {
	label: string;
	children: React.ReactNode;
	help?: string;
	copy?: string;
}

const Help = (props: { text: string }): JSX.Element => (
	<Tooltip content={props.text}>
		<span className={text.muted}>
			<Icon path={icons.help} size={16} />
		</span>
	</Tooltip>
);

const Label = (props: InfoProps): JSX.Element => (
	<div className={[s.label, text.strong].join(" ")}>
		<span>{props.label}</span>
		{props.help && (
			<>
				<DivPx size={8} />
				<Help text={props.help} />
			</>
		)}
	</div>
);

const Value = (props: InfoProps): JSX.Element => (
	<div className={s.value}>{props.children}</div>
);

export const Info = (props: InfoProps) => (
	<div className={s.container}>
		<div className={s.body}>
			<Label {...props} />
			<DivPx size={4} />
			<Value {...props} />
		</div>
		{props.copy && (
			<>
				<DivPx size={16} />
				<CopyButton text={props.copy} />
			</>
		)}
	</div>
);
