import { DivPx, Icon, IconPath } from "@moai/core";
import s from "./info.module.css";

interface Props {
	icon: IconPath;
	label: string;
	children: React.ReactNode;
}

export const OverviewInfo = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Icon display="block" path={props.icon} size={48 as any} />
		<DivPx size={4} />
		<div className={s.body}>
			<div className={s.label}>{props.label}</div>
			<DivPx size={4} />
			<div className={s.value}>{props.children}</div>
		</div>
	</div>
);
