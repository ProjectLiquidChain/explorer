import { DivPx, Icon, IconPath } from "@moai/core";
import s from "./info.module.css";

interface Props {
	icon: IconPath;
	label: string;
	children: React.ReactNode;
}

export const OverviewInfo = (props: Props): JSX.Element => (
	<div className={s.container}>
		<div className={s.header}>
			<Icon display="block" path={props.icon} />
            <DivPx size={4} />
			<div className={s.label}>{props.label}</div>
		</div>
        <DivPx size={8} />
		<div className={s.value}>{props.children}</div>
	</div>
);
