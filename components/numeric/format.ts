const map = new Map<number, Intl.NumberFormat>();

export const formatNumberRaw = (fraction: number, value: number): string => {
	const saved = map.get(fraction);
	if (saved !== undefined) return saved.format(value);
	// Create and save
	const fmt = new Intl.NumberFormat("default", {
		useGrouping: true,
		maximumFractionDigits: fraction,
		minimumFractionDigits: fraction,
	});
	map.set(fraction, fmt);
	return fmt.format(value);
};
