import { text } from "@moai/core";
import NextLink from "next/link";
import s from "./link.module.css";

interface Props {
	href: string;
	children: React.ReactNode;
}

export const Link = ({ children, href }: Props): JSX.Element => (
	<NextLink href={href}>
		<a className={[text.blueStrong, s.link].join(" ")}>{children}</a>
	</NextLink>
);
