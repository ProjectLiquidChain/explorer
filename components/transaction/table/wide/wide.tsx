import { AccountAddress } from "@/components/account/address/address";
import { BlockHeight } from "@/components/block/height/height";
import { Link } from "@/components/link/link";
import { Numeric } from "@/components/numeric/numeric";
import { ReceiptCode } from "@/components/receipt/code/code";
import { Icon, Table, TableColumn, Tag, text } from "@moai/core";
import { ArrowRight } from "@moai/icon/hrs";
import { CompletedTransaction } from "../../transaction";
import s from "./wide.module.css";

interface Props {
	transactions: CompletedTransaction[];
}

interface RowProps {
	transaction: CompletedTransaction;
}

const Hash = ({ transaction }: RowProps): JSX.Element => (
	<Link
		href={`/transactions/${transaction.hash}`}
		children={transaction.hash}
	/>
);

const Type = ({ transaction }: RowProps): JSX.Element => (
	<Tag children={transaction.type} />
);

const Block = ({ transaction }: RowProps): JSX.Element => (
	<BlockHeight value={transaction.height} />
);

const Nonce = ({ transaction }: RowProps): JSX.Element => (
	<Numeric value={transaction.nonce} type="integer" />
);

const Sender = ({ transaction }: RowProps): JSX.Element => (
	<AccountAddress wrap={false} value={transaction.sender} />
);

const Receiver = ({ transaction }: RowProps): JSX.Element => (
	<AccountAddress wrap={false} value={transaction.receiver} />
);

const Arrow = (): JSX.Element => (
	<div className={text.muted}>
		<Icon display="block" path={ArrowRight} size={16} />
	</div>
);

const Code = ({ transaction }: RowProps): JSX.Element => (
	<ReceiptCode code={transaction.receipt.code} format="short" />
);

export const getTableColumns = ({ transactions }: Props): TableColumn[] => [
	{
		title: "Hash",
		className: s.hash,
		render: (i) => <Hash transaction={transactions[i]} />,
	},
	{
		title: "Type",
		className: s.type,
		render: (i) => <Type transaction={transactions[i]} />,
	},
	{
		title: "Code",
		className: s.code,
		render: (i: number) => <Code transaction={transactions[i]} />,
	},
	{
		title: "Sender",
		className: s.sender,
		render: (i) => <Sender transaction={transactions[i]} />,
	},
	{
		title: "",
		className: s.arrow,
		render: () => <Arrow />,
	},
	{
		title: "Receiver",
		className: s.receiver,
		render: (i) => <Receiver transaction={transactions[i]} />,
	},
	{
		title: "Block",
		className: s.block,
		render: (i) => <Block transaction={transactions[i]} />,
	},
	{
		title: "Nonce",
		className: s.nonce,
		render: (i) => <Nonce transaction={transactions[i]} />,
	},
];

export const TransactionTableWide = (props: Props) => (
	<div className={s.container}>
		<Table
			columns={getTableColumns(props)}
			rowKey={(index) => props.transactions[index].hash}
			rowsLength={props.transactions.length}
		/>
	</div>
);
