import { Numeric } from "@/components/numeric/numeric";
import { Table } from "@/components/table/table";
import { Transaction } from "@/models/transaction";
import { Icon, Tag, text } from "@moai/core";
import { icons } from "@moai/icon";
import Link from "next/link";
import s from "./table.module.css";

interface Props {
	transactions: Transaction[];
}

interface TransactionProps {
	transaction: Transaction;
}

const linkCls = [s.link, text.highlight].join(" ");

const Hash = ({ transaction }: TransactionProps): JSX.Element => (
	<Link href={`/transaction/${transaction.hash}`}>
		<a className={linkCls}>{transaction.hash}</a>
	</Link>
);

const Type = ({ transaction }: TransactionProps): JSX.Element => (
	<Tag children={transaction.type} />
);

const Block = ({ transaction }: TransactionProps): JSX.Element => (
	<Link href={`/block/${transaction.height}`}>
		<a className={linkCls}>
			<Numeric value={transaction.height} format="integer" />
		</a>
	</Link>
);

const Nonce = ({ transaction }: TransactionProps): JSX.Element => (
	<Numeric value={transaction.nonce} format="integer" />
);

const Sender = ({ transaction }: TransactionProps): JSX.Element => (
	<Link href={`/account/${transaction.sender}`}>
		<a className={linkCls}>{transaction.sender}</a>
	</Link>
);

const Receiver = ({ transaction }: TransactionProps): JSX.Element => (
	<Link href={`/account/${transaction.receiver}`}>
		<a className={linkCls}>{transaction.receiver}</a>
	</Link>
);

const Arrow = (): JSX.Element => (
	<div className={text.muted}>
		<Icon path={icons.arrowRight} size={16} />
	</div>
);

export const TransactionTable = ({ transactions: txs }: Props) => (
	<div className={s.container}>
		<Table
			columns={[
				{
					title: "Hash",
					className: s.hash,
					render: (i) => <Hash transaction={txs[i]} />,
				},
				{
					title: "Type",
					className: s.type,
					render: (i) => <Type transaction={txs[i]} />,
				},
				{
					title: "Sender",
					className: s.sender,
					render: (i) => <Sender transaction={txs[i]} />,
				},
				{
					title: "",
					className: s.arrow,
					render: () => <Arrow />,
				},
				{
					title: "Receiver",
					className: s.receiver,
					render: (i) => <Receiver transaction={txs[i]} />,
				},
				{
					title: "Block",
					className: s.block,
					render: (i) => <Block transaction={txs[i]} />,
				},
				{
					title: "Nonce",
					className: s.nonce,
					render: (i) => <Nonce transaction={txs[i]} />,
				},
			]}
			rowKey={(index) => txs[index].hash}
			rowsLength={txs.length}
		/>
	</div>
);
