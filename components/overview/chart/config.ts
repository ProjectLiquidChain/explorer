import { ChartConfiguration } from "chart.js";

export const CHART_OPTIONS: ChartConfiguration["options"] = {
	maintainAspectRatio: false,
	scales: {
		x: {
			gridLines: {
				display: false,
			},
		},
		y: {
			gridLines: {
				display: false,
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
