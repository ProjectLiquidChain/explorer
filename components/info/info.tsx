import { Button, DivPx, text } from "@moai/core";
import { icons } from "@moai/icon";
import s from "./info.module.css";

interface Props {
	label: string;
	children: React.ReactNode;
	help?: string;
}

export const Info = (props: Props) => (
	<div className={s.container}>
		<dt className={[text.strong].join(" ")}>{props.label}</dt>
		<DivPx size={4} />
		<dd>{props.children}</dd>
		<div className={s.button}>
			<Button icon={icons.chevronUp} />
		</div>
	</div>
);
