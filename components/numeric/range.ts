export const getRange = (from: number, to: number): number[] => {
	if (from === to) return [from];
	const [start, stop] = [Math.min(from, to), Math.max(from, to)];
	const range = Array(stop - start + 1)
		.fill(start)
		.map((x, y) => x + y);
	return from < to ? range : range.reverse();
};
