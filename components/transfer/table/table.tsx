import { AccountAddress } from "@/components/account/address/address";
import { BlockHeight } from "@/components/block/height/height";
import { Link } from "@/components/link/link";
import { Numeric } from "@/components/numeric/numeric";
import { TokenCurrency } from "@/components/token/currency/currency";
import { Icon, Table, TableColumn, text } from "@moai/core";
import { ArrowRight } from "@moai/icon/hrs";
import { Transfer } from "../transfer";
import s from "./table.module.css";

interface Props {
	transfers: Transfer[];
}

interface RowProps {
	transfer: Transfer;
}

const Sender = ({ transfer }: RowProps): JSX.Element => (
	<AccountAddress wrap={false} value={transfer.from.address} />
);

const Receiver = ({ transfer }: RowProps): JSX.Element => (
	<AccountAddress wrap={false} value={transfer.to.address} />
);

const Arrow = (): JSX.Element => (
	<div className={text.muted}>
		<Icon display="block" path={ArrowRight} size={16} />
	</div>
);

const Token = ({ transfer }: RowProps): JSX.Element => (
	<TokenCurrency token={transfer.token} />
);

const Balance = ({ transfer }: RowProps): JSX.Element => (
	<Numeric
		type="big-decimal"
		value={transfer.amount}
		decimal={transfer.token.decimals}
	/>
);

const Transaction = ({ transfer }: RowProps): JSX.Element => (
	<Link
		href={`/transaction/${transfer.transaction.hash}`}
		children={transfer.transaction.hash}
	/>
);

const Block = ({ transfer }: RowProps): JSX.Element => (
	<BlockHeight value={transfer.transaction.block} />
);

const Memo = ({ transfer }: RowProps): JSX.Element => (
	<span>
		<span className={s.noSelect}>“</span>
		<span>{transfer.memo}</span>
		<span className={s.noSelect}>”</span>
	</span>
);

const getColumns = (): TableColumn<Transfer>[] => [
	{
		title: "Transaction",
		className: s.transaction,
		render: (transfer) => <Transaction transfer={transfer} />,
	},
	{
		title: "Amount",
		className: s.balance,
		render: (transfer) => <Balance transfer={transfer} />,
	},
	{
		title: "Token",
		className: s.token,
		render: (transfer) => <Token transfer={transfer} />,
	},
	{
		title: "Sender",
		className: s.sender,
		render: (transfer) => <Sender transfer={transfer} />,
	},
	{
		title: "",
		className: s.arrow,
		render: () => <Arrow />,
	},
	{
		title: "Receiver",
		className: s.receiver,
		render: (transfer) => <Receiver transfer={transfer} />,
	},
	{
		title: "Block",
		className: s.block,
		render: (transfer) => <Block transfer={transfer} />,
	},
	{
		title: "Memo",
		className: s.memo,
		render: (transfer) => <Memo transfer={transfer} />,
	},
];

export const TransferTable = (props: Props): JSX.Element => (
	<div className={s.container}>
		<Table
			rows={props.transfers}
			columns={getColumns()}
			rowKey={(transfer) => {
				return `${transfer.index}@${transfer.transaction.hash}`;
			}}
		/>
	</div>
);
