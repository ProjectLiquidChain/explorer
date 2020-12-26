import { text } from "@moai/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.css";

interface LinkProps {
	href: string;
	children: string;
}

const Link = (props: LinkProps): JSX.Element => {
	const router = useRouter();
	const activeCls =
		router.pathname === props.href
			? [text.strong, text.blueStrong].join(" ")
			: text.muted;
	return (
		<NextLink href={props.href}>
			<a className={[s.link, activeCls].join(" ")} children={props.children} />
		</NextLink>
	);
};

interface Props {
	fill: boolean;
}

export const Navigation = ({ fill }: Props): JSX.Element => (
	<div className={[s.container, fill ? s.hor : s.ver].join(" ")}>
		<Link href="/">Home</Link>
		<Link href="/blocks">Blocks</Link>
		<Link href="/transactions">Transactions</Link>
	</div>
);