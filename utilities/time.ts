type Timestamp = number;

// In miliseconds
const units: { label: Intl.RelativeTimeFormatUnit; value: number }[] = [
	{ label: "year", value: 24 * 60 * 60 * 1000 * 365 },
	{ label: "month", value: (24 * 60 * 60 * 1000 * 365) / 12 },
	{ label: "day", value: 24 * 60 * 60 * 1000 },
	{ label: "hour", value: 60 * 60 * 1000 },
	{ label: "minute", value: 60 * 1000 },
	{ label: "second", value: 1000 },
];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const getRelativeTime = (d1: Timestamp, d2: Timestamp): string => {
	const elapsed = d1 - d2;
	// "Math.abs" accounts for both "past" & "future" scenarios
	for (let i = 0; i < units.length; i++) {
		const unit = units[i];
		if (Math.abs(elapsed) > unit.value || unit.label == "second")
			return rtf.format(Math.round(elapsed / unit.value), unit.label);
	}
	throw Error("End of relative time unit");
};
