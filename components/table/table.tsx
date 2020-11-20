import { background, borderColor, text } from "@moai/core";
import s from "./table.module.css";

export interface TableColumn {
	title: string;
	className?: string;
	render: (index: number) => React.ReactNode;
}

interface Props {
	columns: TableColumn[];
	rowsLength: number;
	rowKey: (index: number) => string;
}

const topCls = [borderColor.weak, background.secondary, text.strong].join(" ");

const Head = (props: Props): JSX.Element => (
	<tr>
		{props.columns.map((column, index) => (
			<th className={[topCls, column.className].join(" ")} key={index}>
				{column.title}
			</th>
		))}
	</tr>
);

const rowCls = [borderColor.weak, background.primary].join(" ");

const Row = (props: Props & { index: number }): JSX.Element => (
	<tr>
		{props.columns.map((column, index) => (
			<td className={[rowCls, column.className].join(" ")} key={index}>
				{column.render(props.index)}
			</td>
		))}
	</tr>
);

export const Table = (props: Props) => (
	<div className={[s.container, background.primary].join(" ")}>
		<table>
			<thead children={<Head {...props} />} />
			<tbody>
				{new Array(props.rowsLength).fill(0).map((_v, index) => (
					<Row {...props} key={props.rowKey(index)} index={index} />
				))}
			</tbody>
		</table>
	</div>
);
