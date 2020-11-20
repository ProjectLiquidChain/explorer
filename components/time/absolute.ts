import { Timestamp } from "./time";

export type TimeAbsoluteFormat = "long" | "time";

const formatters: Record<TimeAbsoluteFormat, Intl.DateTimeFormat> = {
	long: new Intl.DateTimeFormat("default", {
		timeZoneName: "short",
		hour12: false,
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}),
	time: new Intl.DateTimeFormat("default", {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}),
};

export const formatAbsoluteTime = (
	time: Timestamp,
	format: TimeAbsoluteFormat
): string => formatters[format].format(time);
