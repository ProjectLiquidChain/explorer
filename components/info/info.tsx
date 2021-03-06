import { DivPx, Icon, text, Tooltip } from "@moai/core";
import { InformationCircle } from "@moai/icon/hrs";
import { CopyButton } from "../copy/copy";
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
			<span> </span>
			<Icon display="inline" path={InformationCircle} size={16} />
		</span>
	</Tooltip>
);

const Heading = (props: InfoProps): JSX.Element => (
	<div className={[s.heading, text.strong].join(" ")}>
		<span className={s.label}>{props.label}</span>
		{props.help && <Help text={props.help} />}
	</div>
);

const Value = (props: InfoProps): JSX.Element => (
	<div className={s.value}>{props.children}</div>
);

export const Info = (props: InfoProps) => (
	<div className={s.container}>
		<div className={s.body}>
			<Heading {...props} />
			<div className={s.space} children={<DivPx size={4} />} />
			<Value {...props} />
		</div>
		{props.copy && (
			<>
				<DivPx size={8} />
				<div className={s.copy} children={<CopyButton text={props.copy} />} />
			</>
		)}
	</div>
);
