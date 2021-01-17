import { Link } from "@/components/link/link";
import { Tag } from "@moai/core";
import { Token } from "../token";

interface Props {
	token: Token;
}

export const TokenCurrency = ({ token }: Props): JSX.Element => (
	<Link href={`/account/${token.address}`}>
		<Tag type={Tag.types.highlight}>{token.currency}</Tag>
	</Link>
);
