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

const getColumns = ({ tokens }: Props): TableColumn[] => [
	{
		title: "Name",
		className: s.name,
		render: (i) => <Currency token={tokens[i]} />,
	},
	{
		title: "Address",
		className: s.address,
		render: (i) => <Address token={tokens[i]} />,
	},
];

export const TokenTable = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table
			columns={getColumns(props)}
			rowKey={(i) => props.tokens[i].currency}
			rowsLength={props.tokens.length}
		/>
	</div>
);
