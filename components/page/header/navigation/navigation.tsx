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

export const Navigation = (): JSX.Element => (
	<div className={s.container}>
		<Link href="/">Home</Link>
		<Link href="/blocks/1">Blocks</Link>
		<Link href="/transactions/1">Transactions</Link>
		<Link href="/tokens/1">Tokens</Link>
	</div>
);
