export type NumericFormat = "integer";

interface Props {
	value: number;
	format: NumericFormat;
}

const formatters: Record<NumericFormat, Intl.NumberFormat> = {
	integer: new Intl.NumberFormat("default", {
		useGrouping: true,
		maximumFractionDigits: 0,
	}),
};

export const formatNumber = (value: number, format: NumericFormat): string =>
	formatters[format].format(value);

export const Numeric = (props: Props) => (
	<span>{formatNumber(props.value, props.format)}</span>
);
