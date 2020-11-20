import { background, borderColor, boxShadow } from "@moai/core";
import s from "./pane.module.css";

interface Props {
	children: React.ReactNode;
	noPadding?: boolean;
}

export const Pane = ({ children, noPadding }: Props): JSX.Element => (
	<div
		className={[
			s.container,
			background.primary,
			boxShadow.strong,
			borderColor.weak,
			noPadding ? "" : s.padding,
		].join(" ")}
		children={children}
	/>
);
