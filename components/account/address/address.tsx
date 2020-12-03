import { Link } from "@/components/link/link";
import { Tag, Tooltip } from "@moai/core";
import { useRouter } from "next/router";
import { Account } from "../account";
import s from "./address.module.css";

interface Props {
	value: Account["address"];
	wrap: boolean;
	hideVerified?: boolean;
}

const verifiedMap = new Map([
	["LB36YY2JHKXFXSESE75QIB5KWTOPFJ5G4267PJWLPY4WDLHGCBRRJWLS", "QASH"],
	["LCPML46ZM36URNZZYESDE5KSBP44L7MPXJMK2WBHGXITKB6LWUCSAQGR", "UNI"],
	["LAU2VYQRRQQTWSQ3O2673AJWRXCDSVLXTPDTEBB7BAKLWGUMXSQFMGTO", "ACC"],
	["LCDU2FKRJE5Q2XYITDEP2C5IYOFFZQ3D7JPPZA3P62DTC2YMRM2SQQAK", "BTC"],
	["LBPT5GA6CCNRR7ETPB4MOTXKMTLLS6TSGLG56G4JR5SVT6P3265L47MC", "ETH"],
	["LDPIDYYRZQMNJOSYMARDUSVOVKKQ4SQFRUVME7FKFQJP3XWGEQSKQD35", "NEO"],
	["LDRTCOPPFZPZ2WL62KD2KOATDCURUUA3LHZSOGQDVVERUBJKKRF23RQQ", "TRX"],
	["LBXM4BFKECDBBSMBWVIJNHTAI5UHFIDR3SGF5YRLAGDCWATP7K7PYTWX", "BNB"],
	["LDNO77ICW5BIKIN76BQQ6LKVSJGGNQAYEZU4DKJHI3SXBPRAYZY7SLLD", "USDT"],
]);

const Verified = ({ value }: { value: string }): JSX.Element => (
	<Tooltip content="Verified contract account">
		<span>
			<Tag children={value} />
			<span> – </span>
		</span>
	</Tooltip>
);

export const AccountAddress = ({ value, wrap, hideVerified }: Props) => {
	const verified = verifiedMap.get(value);
	const children = (
		<span className={wrap ? s.wrap : s.nowrap}>
			{verified !== undefined && !hideVerified && <Verified value={verified} />}
			<span className={s.text}>{value}</span>
		</span>
	);

	const router = useRouter();
	if (router.query.address === value) return children;
	return <Link href={`/account/${value}`} children={children} />;
};
