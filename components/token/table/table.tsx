import { AccountAddress } from "@/components/account/address/address";
import { Table, TableColumn } from "@moai/core";
import { Token } from "../token";
import s from "./table.module.css";

interface Props {
	tokens: Token[];
}

interface RowProps {
	token: Token;
}

const Address = ({ token }: RowProps): JSX.Element => (
	<AccountAddress hideVerified wrap={false} value={token.address} />
);

const Currency = ({ token }: RowProps): JSX.Element => (
	<span>{token.currency}</span>
);

const getColumns = (): TableColumn<Token>[] => [
	{
		title: "Name",
		className: s.name,
		render: (token) => <Currency token={token} />,
	},
	{
		title: "Address",
		className: s.address,
		render: (token) => <Address token={token} />,
	},
];

export const TokenTable = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table
			rows={props.tokens}
			columns={getColumns()}
			rowKey={(token) => token.currency}
		/>
	</div>
);
