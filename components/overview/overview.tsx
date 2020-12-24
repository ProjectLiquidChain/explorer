import { Clock, Cube, DocumentText } from "@moai/icon/hrs";
import { Block } from "../block/block";
import { container } from "../container/container";
import { Numeric } from "../numeric/numeric";
import { OverviewChart } from "./chart/chart";
import { OverviewInfo } from "./info/info";
import s from "./overview.module.css";

interface Props {
	block: Block;
}

export const Overview = (props: Props) => (
	<div className={s.wrapper}>
		<div className={[s.container, container.max960].join(" ")}>
			<div className={s.overview}>
				<OverviewInfo icon={Cube} label="Block Height">
					<Numeric type="integer" value={props.block.height} />
				</OverviewInfo>
				<OverviewInfo icon={DocumentText} label="Total Transactions">
					<Numeric type="integer" value={82712821} />
				</OverviewInfo>
				<OverviewInfo icon={Clock} label="Avg. Block Time (24h)">
					30.4 seconds
				</OverviewInfo>
				<OverviewInfo icon={Clock} label="Avg. Tx Per Block (24h)">
					10 transactions
				</OverviewInfo>
			</div>
            <div className={s.chart}>
                <OverviewChart />
            </div>
		</div>
	</div>
);
