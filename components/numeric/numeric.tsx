type Format = "integer";

interface Props {
	value: number;
	format: Format;
}

const formatters: Record<Format, Intl.NumberFormat> = {
	integer: new Intl.NumberFormat("default", {
		useGrouping: true,
		maximumFractionDigits: 0,
	}),
};

export const formatNumber = (value: number, format: Format): string =>
	formatters[format].format(value);

export const Numeric = (props: Props) => (
	<span>{formatNumber(props.value, props.format)}</span>
);
