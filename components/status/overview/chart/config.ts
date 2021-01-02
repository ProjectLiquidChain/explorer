import { ChartConfiguration } from "chart.js";

export const CHART_OPTIONS: ChartConfiguration["options"] = {
	maintainAspectRatio: false,
	elements: {
		point: {
			radius: 0,
			borderColor: "transparent",
		},
		line: {
			borderWidth: 2,
		},
	},
	scales: {
		x: {
			ticks: {
				// @TODO: Move to font after the fix is released
				// https://github.com/chartjs/Chart.js/pull/8222
				...({ color: "#bae5fd" } as any),
				// font: { color: "bae5fd" }, // This currently has no effect
				maxTicksLimit: 3,
				maxRotation: 0,
			},
			gridLines: {
				display: false,
				drawBorder: false,
			},
		},
		y: {
			ticks: {
				// @TODO: Move to font after the fix is released
				// https://github.com/chartjs/Chart.js/pull/8222
				...({ color: "#bae5fd" } as any),
				// font: { color: "bae5fd" }, // This currently has no effect
				maxTicksLimit: 3,
			},
			gridLines: {
				display: false,
				drawBorder: false,
			},
		},
	},
	animation: {
		duration: 100,
	},
	interaction: {
		intersect: false,
	},
	plugins: {
		tooltip: {
			animation: {
				duration: 100,
			},
		},
	},
};
