import { AccountAddress } from "@/components/account/address/address";
import { Numeric } from "@/components/numeric/numeric";
import { TokenCurrency } from "@/components/token/currency/currency";
import { Table, TableColumn } from "@moai/core";
import { Asset } from "../asset";
import s from "./table.module.css";

interface Props {
	assets: Asset[];
}

interface RowProps {
	asset: Asset;
}

const Token = ({ asset }: RowProps): JSX.Element => (
	<TokenCurrency token={asset.token} />
);

const Balance = ({ asset }: RowProps): JSX.Element => (
	<Numeric
		type="big-decimal"
		value={asset.balance}
		decimal={asset.token.decimals}
	/>
);

const Address = ({ asset }: RowProps): JSX.Element => (
	<AccountAddress value={asset.token.address} wrap={false} hideVerified />
);

const getColumns = (): TableColumn<Asset>[] => [
	{
		title: "Token",
		className: s.token,
		render: (row) => <Token asset={row} />,
	},
	{
		title: "Balance",
		className: s.balance,
		render: (row) => <Balance asset={row} />,
	},
	{
		title: "Address",
		className: s.address,
		render: (row) => <Address asset={row} />,
	},
];

export const AssetTable = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table<Asset>
			rows={props.assets}
			columns={getColumns()}
			rowKey={(row) => row.token.currency}
		/>
	</div>
);
