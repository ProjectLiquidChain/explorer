import * as C from "chart.js";
import { useEffect, useRef } from "react";
import { CHART_OPTIONS } from "./config";

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

const CHART_CONFIG: C.ChartConfiguration = {
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
	options: CHART_OPTIONS,
};

export const OverviewChart = (): JSX.Element => {
	const canvas = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		var ctx = canvas.current?.getContext("2d") ?? null;
		if (ctx === null) throw Error("Canvas context is null");
		var chart = new C.Chart(ctx, CHART_CONFIG);
		return () => void chart.destroy();
	}, [canvas]);
	return <canvas ref={canvas} width="100" height="100" />;
};
