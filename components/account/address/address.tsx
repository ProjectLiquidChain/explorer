import { Link } from "@/components/link/link";
import { DivPx, Icon, text, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
import { Account } from "../account";
import s from "./address.module.css";

interface Props {
	value: Account["address"];
	wrap: boolean;
}

const verified = ["LB36YY2JHKXFXSESE75QIB5KWTOPFJ5G4267PJWLPY4WDLHGCBRRJWLS"];

const Verified = () => (
	<Tooltip content="Verified contract account">
		<span className={text.positive}>
			<Icon display="inline" path={icons.tickCircle} size={16} />
			<span> </span>
		</span>
	</Tooltip>
);

export const AccountAddress = ({ value, wrap }: Props) => (
	<Link href={`/account/${value}`}>
		<span className={wrap ? s.wrap : s.nowrap}>
			{verified.includes(value) && <Verified />}
			<span className={s.text}>{value}</span>
		</span>
	</Link>
);
