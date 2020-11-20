import { formatAbsoluteTime, TimeAbsoluteFormat } from "./absolute";
import { formatRelativeTime } from "./relative";

export type Timestamp = number;

export type TimeFormat = "relative" | TimeAbsoluteFormat;

interface Props {
	value: Timestamp;
	format: TimeFormat;
}

export const formatTime = (value: Timestamp, format: TimeFormat): string => {
	switch (format) {
		case "relative":
			return formatRelativeTime(value);
		default:
			return formatAbsoluteTime(value, format);
	}
};

export const Time = (props: Props) => (
	<span>{formatTime(props.value, props.format)}</span>
);
