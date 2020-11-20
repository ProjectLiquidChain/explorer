import { text } from "@moai/core";
import s from "./heading.module.css";

interface Props {
	children: React.ReactNode;
}

export const Heading = ({ children }: Props): JSX.Element => (
	<h2 className={[s.container, text.strong].join(" ")} children={children} />
);
