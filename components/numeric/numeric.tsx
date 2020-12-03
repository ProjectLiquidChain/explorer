import { text } from "@moai/core";
import Big from "big.js";
import { formatNumberRaw } from "./format";

(Big as any).strict = true;

interface IntegerProps {
	type: "integer";
	value: number;
}

interface BigDecimalProps {
	type: "big-decimal";
	value: string;
	decimal: number;
}

type Props = IntegerProps | BigDecimalProps;

export const formatNumber = (props: Props): string => {
	switch (props.type) {
		case "integer":
			return formatNumberRaw(0, props.value);
		case "big-decimal":
			const raw = new Big(props.value);
			const decimal = new Big(`1e${props.decimal.toString()}`);
			const value = raw.div(decimal);
			try {
				// This throws error if value is out of safe range
				const num = value.toNumber();
				return formatNumberRaw(props.decimal, num);
			} catch (error) {
				return value.toString();
			}
	}
};

const splitZeros = (text: string): [string, string] => {
	let i = text.length - 1;
	while (text[i] === "0") i--;
	return [text.slice(0, i + 1), text.slice(i + 1)];
};

export const Numeric = (props: Props): JSX.Element => {
	const value = formatNumber(props);
	if (props.type === "big-decimal" && props.decimal > 0) {
		const [significant, zero] = splitZeros(value);
		return (
			<span>
				<span>{significant}</span>
				<span className={text.muted}>{zero}</span>
			</span>
		);
	} else {
		return <span>{value}</span>
	}
};
