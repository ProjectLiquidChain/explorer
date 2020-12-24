import * as C from "chart.js";
import { useEffect, useRef } from "react";

C.Chart.register(
	C.LineController,
	C.LineElement,
	C.CategoryScale,
	C.LinearScale,
	C.PointElement,
	C.Tooltip
);

const random = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const CHART_OPTIONS: C.ChartConfiguration = {
	type: "line",
	data: {
		labels: Array.from({ length: 14 }, (_v, i) => `Dec ${i + 1}`),
		datasets: [
			{
				label: "Transactions",
				backgroundColor: "transparent",
				borderColor: "white",
				data: Array.from({ length: 14 }, () => random(10e6, 20e6)),
				tension: 0.5,
			},
		],
	},
	options: {
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
	},
};

export const OverviewChart = (): JSX.Element => {
	const canvas = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		var ctx = canvas.current?.getContext("2d") ?? null;
		if (ctx === null) throw Error("Canvas context is null");
		var chart = new C.Chart(ctx, CHART_OPTIONS);
		return () => void chart.destroy();
	}, [canvas]);
	return <canvas ref={canvas} width="500" height="100" />;
};
