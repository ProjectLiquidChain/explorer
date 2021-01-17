import { AccountAddress } from "@/components/account/address/address";
import { BlockHeight } from "@/components/block/height/height";
import { Link } from "@/components/link/link";
import { Numeric } from "@/components/numeric/numeric";
import { ReceiptCode } from "@/components/receipt/code/code";
import { Icon, Table, TableColumn, Tag, text } from "@moai/core";
import { ArrowRight } from "@moai/icon/hrs";
import { TransactionBundle } from "../../transaction";
import s from "./wide.module.css";

interface Props {
	transactions: TransactionBundle[];
}

interface RowProps {
	bundle: TransactionBundle;
}

const Hash = ({ bundle }: RowProps): JSX.Element => (
	<Link
		href={`/transaction/${bundle.transaction.hash}`}
		children={bundle.transaction.hash}
	/>
);

const Type = ({ bundle }: RowProps): JSX.Element => (
	<Tag type={Tag.types.neutral} children={bundle.transaction.type} />
);

const Block = ({ bundle }: RowProps): JSX.Element => (
	<BlockHeight value={bundle.transaction.height} />
);

const Nonce = ({ bundle }: RowProps): JSX.Element => (
	<Numeric value={bundle.transaction.nonce} type="integer" />
);

const Sender = ({ bundle }: RowProps): JSX.Element => (
	<AccountAddress wrap={false} value={bundle.transaction.sender} />
);

const Receiver = ({ bundle }: RowProps): JSX.Element => (
	<AccountAddress wrap={false} value={bundle.transaction.receiver} />
);

const Arrow = (): JSX.Element => (
	<div className={text.muted}>
		<Icon display="block" path={ArrowRight} size={16} />
	</div>
);

const Code = ({ bundle }: RowProps): JSX.Element => (
	<ReceiptCode code={bundle.receipt.code} format="short" />
);

export const getTransactionColumns = (): TableColumn<TransactionBundle>[] => [
	{
		title: "Hash",
		className: s.hash,
		render: (bundle) => <Hash bundle={bundle} />,
	},
	{
		title: "Type",
		className: s.type,
		render: (bundle) => <Type bundle={bundle} />,
	},
	{
		title: "Code",
		className: s.code,
		render: (bundle) => <Code bundle={bundle} />,
	},
	{
		title: "Sender",
		className: s.sender,
		render: (bundle) => <Sender bundle={bundle} />,
	},
	{
		title: "",
		className: s.arrow,
		render: () => <Arrow />,
	},
	{
		title: "Receiver",
		className: s.receiver,
		render: (bundle) => <Receiver bundle={bundle} />,
	},
	{
		title: "Block",
		className: s.block,
		render: (bundle) => <Block bundle={bundle} />,
	},
	{
		title: "Nonce",
		className: s.nonce,
		render: (bundle) => <Nonce bundle={bundle} />,
	},
];

export const TransactionTableWide = (props: Props) => (
	<div className={s.container}>
		<Table
			rows={props.transactions}
			columns={getTransactionColumns()}
			rowKey={(bundle) => bundle.transaction.hash}
		/>
	</div>
);
