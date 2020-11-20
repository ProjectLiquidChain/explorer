import { Table } from "@/components/table/table";
import { Call } from "@/models/transaction";
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
	<div>
		{call.arguments.map((argument) => (
			<Tag
				key={argument.name}
				children={`${argument.name}: ${argument.value}`}
			/>
		))}
	</div>
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
