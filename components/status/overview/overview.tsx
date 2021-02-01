import { container } from "@/components/container/container";
import { Numeric } from "@/components/numeric/numeric";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { useEffect, useState } from "react";
import { getStatus } from "../fetch/fetch";
import { Status } from "../status";
import { OverviewChart } from "./chart/chart";
import { OverviewBlockIcon } from "./icons/block";
import { OverviewPriceIcon } from "./icons/price";
import { OverviewTimeIcon } from "./icons/time";
import { OverviewTransactionIcon } from "./icons/transaction";
import { OverviewInfo } from "./info/info";
import s from "./overview.module.css";

interface Props {
	status: Status;
}

const Body = (props: Props): JSX.Element => {
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		let timer: number | undefined = undefined;
		const load = async () => {
			setStatus(await getStatus(undefined));
			timer = window.setTimeout(load, BLOCK_INTERVAL_SECONDS * 1000);
		};
		load();
		return () => window.clearTimeout(timer);
	}, []);

	return (
		<div className={s.body}>
			<div className={s.info1}>
				<OverviewInfo icon={OverviewBlockIcon} label="Block Height">
					<Numeric type="integer" value={status.blockHeight} />
				</OverviewInfo>
			</div>
			<div className={s.info2}>
				<OverviewInfo icon={OverviewTimeIcon} label="Avg. Block Time (24h)">
					{status.blockAverageTime} seconds
				</OverviewInfo>
			</div>
			<div className={s.info3}>
				<OverviewInfo icon={OverviewPriceIcon} label="Latest price">
					<Numeric type="float" fraction={8} value={status.price} />
				</OverviewInfo>
			</div>
			<div className={s.info4}>
				<OverviewInfo icon={OverviewTransactionIcon} label="Total Transactions">
					<Numeric type="integer" value={status.transactionCount} />
				</OverviewInfo>
			</div>
			<div className={s.chart}>
				<OverviewChart />
			</div>
		</div>
	);
};

export const StatusOverview = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<div className={[s.container, container.max960].join(" ")}>
			<div className={s.title}>Liquid Chain Explorer</div>
			<Body {...props} />
		</div>
	</div>
);
