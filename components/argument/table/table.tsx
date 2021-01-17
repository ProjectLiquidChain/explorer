import { AccountAddress } from "@/components/account/address/address";
import { Numeric } from "@/components/numeric/numeric";
import { Table } from "@moai/core";
import { Argument } from "../argument";
import s from "./table.module.css";

interface Props {
	args: Argument[];
}

interface RowProps {
	arg: Argument;
}

const Value = ({ arg }: RowProps): JSX.Element => {
	switch (arg.type) {
		case "lparray":
			return <span>{arg.value}</span>;
		case "address":
			return <AccountAddress wrap value={arg.value} />;
		case "float32":
		case "float64":
			return <span>{arg.value}</span>; // @TODO Numeric float
		default:
			return <Numeric type="big-decimal" value={arg.value} decimal={0} />;
	}
};

export const ArgumentTable = ({ args }: Props) => (
	<div className={s.container}>
		<Table
			rows={args}
			rowKey={(row) => row.name}
			columns={[
				{
					title: "Parameter",
					className: s.name,
					render: (row) => row.name,
				},
				{
					title: "Type",
					className: s.type,
					render: (row) => row.type,
				},
				{
					title: "Value",
					className: s.value,
					render: (row) => <Value arg={row} />,
				},
			]}
		/>
	</div>
);
