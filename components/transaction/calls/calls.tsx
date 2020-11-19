import { Call } from "@/models/transaction";
import { background, borderColor, Tag, text } from "@moai/core";
import Link from "next/link";
import s from "./calls.module.css";

interface Props {
	calls: Call[];
}

const cellCls = [s.cell, borderColor.weak].join(" ");

const topCls = [cellCls, s.top, background.secondary, text.strong].join(" ");

const Head = (): JSX.Element => (
	<tr className={borderColor.weak}>
		<th className={[topCls, s.name, s.left].join(" ")}>Name</th>
		<th className={[topCls, s.contract, s.left2].join(" ")}>Contract</th>
		<th className={[topCls, s.arguments].join(" ")}>Arguments</th>
	</tr>
);

interface RowProps {
	call: Call;
}

const linkCls = [s.link, text.highlight].join(" ");

const Row = ({ call }: RowProps): JSX.Element => (
	<tr>
		<td className={[cellCls, s.name, s.left, background.primary].join(" ")}>
			{call.name}
		</td>
		<td className={[cellCls, s.contract, s.left2].join(" ")}>
			<Link href={`/account/${call.contract}`}>
				<a className={linkCls}>{call.contract}</a>
			</Link>
		</td>
		<td className={[cellCls, s.arguments].join(" ")}>
			{call.arguments.map((argument) => (
				<Tag
					key={argument.name}
					children={`${argument.name}: ${argument.value}`}
				/>
			))}
		</td>
	</tr>
);

export const TransactionCalls = (props: Props) => (
	<div className={[s.container, background.primary].join(" ")}>
		<table className={s.table}>
			<thead>
				<Head />
			</thead>
			<tbody>
				{props.calls.map((call, index) => (
					<Row call={call} key={index} />
				))}
			</tbody>
		</table>
	</div>
);
