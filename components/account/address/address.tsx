import { Link } from "@/components/link/link";
import { Token } from "@/components/token/token";
import { VerifiedTokensContext } from "@/components/token/verified/verified";
import { Tag, Tooltip } from "@moai/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Account } from "../account";
import s from "./address.module.css";

interface Props {
	value: Account["address"];
	wrap: boolean;
	hideVerified?: boolean;
}

const Verified = ({ token }: { token: Token }): JSX.Element => (
	<Tooltip content="Verified contract account">
		<span>
			<Tag children={token.currency} />
			<span> – </span>
		</span>
	</Tooltip>
);

export const AccountAddress = (props: Props): JSX.Element => {
	const { value, wrap, hideVerified } = props;
	const tokenMap = useContext(VerifiedTokensContext);
	const token = tokenMap.get(value);

	const children = (
		<span className={wrap ? s.wrap : s.nowrap}>
			{token !== undefined && !hideVerified && <Verified token={token} />}
			<span className={s.text}>{value}</span>
		</span>
	);

	const router = useRouter();
	if (router.query.address === value) return children;
	return <Link href={`/accounts/${value}`} children={children} />;
};
