import { AccountAddress } from "@/components/account/address/address";
import { BlockHeight } from "@/components/block/height/height";
import { Link } from "@/components/link/link";
import { Numeric } from "@/components/numeric/numeric";
import { ReceiptCode } from "@/components/receipt/code/code";
import { Receipt } from "@/components/receipt/receipt";
import { Table } from "@/components/table/table";
import { Transaction } from "@/components/transaction/transaction";
import { Icon, Tag, text } from "@moai/core";
import { icons } from "@moai/icon";
import s from "./table.module.css";

interface Props {
	transactions: Transaction[];
	receipts: Receipt[];
}

interface TransactionProps {
	transaction: Transaction;
}

interface ReceiptProps {
	receipt: Receipt;
}

const Hash = ({ transaction }: TransactionProps): JSX.Element => (
	<Link href={`/transaction/${transaction.hash}`} children={transaction.hash} />
);

const Type = ({ transaction }: TransactionProps): JSX.Element => (
	<Tag children={transaction.type} />
);

const Block = ({ transaction }: TransactionProps): JSX.Element => (
	<BlockHeight value={transaction.height} />
);

const Nonce = ({ transaction }: TransactionProps): JSX.Element => (
	<Numeric value={transaction.nonce} format="integer" />
);

const Sender = ({ transaction }: TransactionProps): JSX.Element => (
	<AccountAddress wrap={false} value={transaction.sender} />
);

const Receiver = ({ transaction }: TransactionProps): JSX.Element => (
	<AccountAddress wrap={false} value={transaction.receiver} />
);

const Arrow = (): JSX.Element => (
	<div className={text.muted}>
		<Icon display="block" path={icons.arrowRight} size={16} />
	</div>
);

const Code = ({ receipt }: ReceiptProps): JSX.Element => (
	<ReceiptCode code={receipt.code} format="short" />
);

export const TransactionTable = ({ transactions: txs, receipts }: Props) => (
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
					title: "Code",
					className: s.code,
					render: (i) => <Code receipt={receipts[i]} />,
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
