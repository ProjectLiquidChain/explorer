import { Transaction } from "@/models/transaction";
import { background, borderColor, text } from "@moai/core";
import Link from "next/link";
import { Numeric } from "../number/number";
import s from "./transaction-table.module.css";

interface Props {
	transactions: Transaction[];
}

const cellCls = [s.cell, borderColor.weak].join(" ");

const topCls = [cellCls, s.top, background.secondary, text.strong].join(" ");

const Head = (): JSX.Element => (
	<tr className={borderColor.weak}>
		<th className={[topCls, s.hash, s.left].join(" ")}>Transaction Hash</th>
		<th className={[topCls, s.block, s.left2].join(" ")}>Block</th>
		<th className={[topCls, s.nonce].join(" ")}>Nonce</th>
		<th className={[topCls, s.sender].join(" ")}>Sender</th>
		<th className={[topCls, s.receiver].join(" ")}>Receiver</th>
	</tr>
);

interface RowProps {
	transaction: Transaction;
}

const linkCls = [s.link, text.highlight].join(" ");

const Row = (props: RowProps): JSX.Element => {
	const { hash, height, sender, receiver, nonce } = props.transaction;
	return (
		<tr key={hash}>
			<td className={[cellCls, s.hash, s.left, background.primary].join(" ")}>
				<Link href={`/transaction/${hash}`}>
					<a className={linkCls}>{hash}</a>
				</Link>
			</td>
			<td className={[cellCls, s.block, s.left2].join(" ")}>
				<Link href={`/block/${height}`}>
					<a className={linkCls}>
						<Numeric value={height} format="integer" />
					</a>
				</Link>
			</td>
			<td className={[cellCls, s.nonce].join(" ")}>
				<Numeric value={nonce} format="integer" />
			</td>
			<td className={[cellCls, s.sender].join(" ")}>
				<Link href={`/account/${sender}`}>
					<a className={linkCls}>{sender}</a>
				</Link>
			</td>
			<td className={[cellCls, s.receiver].join(" ")}>
				<Link href={`/account/${receiver}`}>
					<a className={linkCls}>{receiver}</a>
				</Link>
			</td>
		</tr>
	);
};

export const TransactionTable = (props: Props) => (
	<div className={[s.container, background.primary].join(" ")}>
		<table className={s.table}>
			<thead>
				<Head />
			</thead>
			<tbody>
				{props.transactions.map((transaction) => (
					<Row transaction={transaction} key={transaction.hash} />
				))}
			</tbody>
		</table>
	</div>
);
