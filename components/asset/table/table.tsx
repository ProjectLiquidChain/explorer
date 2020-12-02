import { AccountAddress } from "@/components/account/address/address";
import { Table, TableColumn } from "@/components/table/table";
import { Asset } from "../asset";
import s from "./table.module.css";

interface Props {
	assets: Asset[];
}

interface RowProps {
	asset: Asset;
}

const Token = ({ asset }: RowProps): JSX.Element => (
	<span>{asset.token.currency}</span>
);

const Balance = ({ asset }: RowProps): JSX.Element => (
	<div>9,223,372,036,854,775,808</div>
	// <div>{asset.balance}</div>
);

const Address = ({ asset }: RowProps): JSX.Element => (
	<AccountAddress value={asset.token.address} wrap={false} hideVerified />
);

const getColumns = ({ assets }: Props): TableColumn[] => [
	{
		title: "Token",
		className: s.token,
		render: (i) => <Token asset={assets[i]} />,
	},
	{
		title: "Balance",
		className: s.balance,
		render: (i) => <Balance asset={assets[i]} />,
	},
	{
		title: "Address",
		className: s.address,
		render: (i) => <Address asset={assets[i]} />,
	},
];

export const AssetTable = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table
			columns={getColumns(props)}
			rowKey={(index) => props.assets[index].token.currency}
			rowsLength={props.assets.length}
		/>
	</div>
);
