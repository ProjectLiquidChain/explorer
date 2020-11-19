import { background, borderColor, boxShadow } from "@moai/core";
import s from "./pane.module.css";

interface Props {
	children: React.ReactNode;
}

export const Pane = ({ children }: Props): JSX.Element => (
	<div
		className={[
			s.container,
			background.primary,
			boxShadow.strong,
			borderColor.weak,
        ].join(" ")}
        children={children}
	/>
);
