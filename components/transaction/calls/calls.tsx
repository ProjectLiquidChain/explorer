import { Table } from "@/components/table/table";
import { Call } from "@/components/transaction/transaction";
import { Tag, text } from "@moai/core";
import Link from "next/link";
import s from "./calls.module.css";

interface Props {
	calls: Call[];
}

interface RowProps {
	call: Call;
}

const linkCls = [s.link, text.highlight].join(" ");

const Name = ({ call }: RowProps): JSX.Element => <span>{call.name}</span>;

const Contract = ({ call }: RowProps): JSX.Element => (
	<Link href={`/account/${call.contract}`}>
		<a className={linkCls}>{call.contract}</a>
	</Link>
);

const Arguments = ({ call }: RowProps): JSX.Element => (
	<ul>
		{call.args.map((argument) => (
			<li className={s.argument} key={argument.name}>
				<span className={text.strong}>{argument.name}:</span>
				<span> {argument.value}</span>
			</li>
		))}
	</ul>
);

export const TransactionCalls = ({ calls }: Props) => (
	<div className={s.container}>
		<Table
			columns={[
				{
					title: "Name",
					className: s.name,
					render: (i) => <Name call={calls[i]} />,
				},
				{
					title: "Contract",
					className: s.contract,
					render: (i) => <Contract call={calls[i]} />,
				},
				{
					title: "Arguments",
					className: s.arguments,
					render: (i) => <Arguments call={calls[i]} />,
				},
			]}
			rowKey={(index) => index.toString()}
			rowsLength={calls.length}
		/>
	</div>
);
