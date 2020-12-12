import { AccountAddress } from "@/components/account/address/address";
import { Numeric } from "@/components/numeric/numeric";
import { Table } from "@/components/table/table";
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
			columns={[
				{
					title: "Parameter",
					className: s.name,
					render: (i) => args[i].name,
				},
				{
					title: "Type",
					className: s.type,
					render: (i) => args[i].type,
				},
				{
					title: "Value",
					className: s.value,
					render: (i) => <Value arg={args[i]} />,
				},
			]}
			rowKey={(i) => args[i].name}
			rowsLength={args.length}
		/>
	</div>
);
