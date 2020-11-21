import { AccountAddress } from "@/components/account/address/address";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@/components/pane/pane";
import { Table, TableColumn } from "@/components/table/table";
import { Transaction } from "@/components/transaction/transaction";
import { Border, DivPx, text } from "@moai/core";
import s from "./payload.module.css";

interface Props {
	payload: Transaction["payload"];
}

interface ArgProps {
	arg: Transaction["payload"]["args"][0];
}

const Type = ({ arg }: ArgProps): JSX.Element => (
	<span className={text.highlight}>{arg.type}</span>
);

const Value = ({ arg }: ArgProps): JSX.Element => {
	switch (arg.type) {
		case "lparray":
			return <span>{arg.value}</span>;
		case "address":
			return <AccountAddress value={arg.value} />;
		case "float32":
		case "float64":
			return <span>{arg.value}</span>; // @TODO Numeric float
		default:
			return <Numeric format="integer" value={parseInt(arg.value)} />;
	}
};

export const TransactionPayload = ({ payload }: Props) => {
	const columns: TableColumn[] = [
		{
			title: "Argument",
			className: s.name,
			render: (i) => payload.args[i].name,
		},
		{
			title: "Type",
			className: s.type,
			render: (i) => <Type arg={payload.args[i]} />,
		},
		{
			title: "Value",
			className: s.value,
			render: (i) => <Value arg={payload.args[i]} />,
		},
	];
	return (
		<Pane>
			<Info label="Payload name" children={payload.name} />
			<DivPx size={32} />
			<div className={s.table}>
				<Border color="weak" />
				<Table
					columns={columns}
					rowKey={(i) => payload.args[i].name}
					rowsLength={payload.args.length}
				/>
			</div>
		</Pane>
	);
};
