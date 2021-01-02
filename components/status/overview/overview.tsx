import { container } from "@/components/container/container";
import { Numeric } from "@/components/numeric/numeric";
import { Status } from "../status";
import { OverviewChart } from "./chart/chart";
import { OverviewBlockIcon } from "./icons/block";
import { OverviewBlockTimeIcon } from "./icons/block-time";
import { OverviewBlockTransactionIcon } from "./icons/block-transaction";
import { OverviewTransactionIcon } from "./icons/transaction";
import { OverviewInfo } from "./info/info";
import s from "./overview.module.css";

interface Props {
	status: Status;
}

const Body = (props: Props): JSX.Element => (
	<div className={s.body}>
		<div className={s.info1}>
			<OverviewInfo icon={OverviewBlockIcon} label="Block Height">
				<Numeric type="integer" value={props.status.blockHeight} />
			</OverviewInfo>
		</div>
		<div className={s.info2}>
			<OverviewInfo icon={OverviewBlockTimeIcon} label="Avg. Block Time (24h)">
				{props.status.blockAverageTime} seconds
			</OverviewInfo>
		</div>
		<div className={s.info3}>
			<OverviewInfo icon={OverviewBlockTransactionIcon} label="Latest price">
				<Numeric type="float" fraction={8} value={props.status.price} />
			</OverviewInfo>
		</div>
		<div className={s.info4}>
			<OverviewInfo icon={OverviewTransactionIcon} label="Total Transactions">
				<Numeric type="integer" value={props.status.transactionCount} />
			</OverviewInfo>
		</div>
		<div className={s.chart}>
			<OverviewChart />
		</div>
	</div>
);

export const StatusOverview = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<div className={[s.container, container.max960].join(" ")}>
			<div className={s.title}>Liquid Chain Explorer</div>
			<Body {...props} />
		</div>
	</div>
);
