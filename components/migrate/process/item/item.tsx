import { coreIcons, DivPx, Icon, ProgressCircle, text } from "@moai/core";
import s from "./item.module.css";

interface Props {
	status: "done" | "busy";
	label: string;
}

export const MigrateProcessItem = (props: Props): JSX.Element => (
	<div className={s.container}>
		<div className={[s.icon].join(" ")}>
			{props.status === "done" ? (
				<div className={text.successWeak}>
					<Icon display="block" path={coreIcons.tick} />
				</div>
			) : (
				<ProgressCircle
					color={ProgressCircle.colors.highlight}
					size={16}
					value="indeterminate"
				/>
			)}
		</div>
		<DivPx size={8} />
		<div className={s.label}>{props.label}</div>
	</div>
);
