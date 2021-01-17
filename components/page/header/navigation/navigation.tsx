import { text } from "@moai/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.css";

interface LinkProps {
	href: string;
	children: string;
}

const isSame = (route: string, me: string): boolean => {
	if (route === "/") {
		return me === "/";
	} else {
		return me.startsWith(route);
	}
};

const Link = (props: LinkProps): JSX.Element => {
	const router = useRouter();
	const activeCls = isSame(props.href, router.pathname)
		? [text.strong, text.highlightStrong].join(" ")
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
		<Link href="/blocks">Blocks</Link>
		<Link href="/transactions">Transactions</Link>
		<Link href="/transfers">Transfers</Link>
		<Link href="/tokens">Tokens</Link>
	</div>
);
