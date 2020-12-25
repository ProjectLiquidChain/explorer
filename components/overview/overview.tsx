import { Block } from "../block/block";
import { container } from "../container/container";
import { Numeric } from "../numeric/numeric";
import { OverviewChart } from "./chart/chart";
import { OverviewBlockIcon } from "./icons/block";
import { OverviewBlockTimeIcon } from "./icons/block-time";
import { OverviewBlockTransactionIcon } from "./icons/block-transaction";
import { OverviewTransactionIcon } from "./icons/transaction";
import { OverviewInfo } from "./info/info";
import s from "./overview.module.css";

interface Props {
	block: Block;
}

/*
				<OverviewInfo icon={Clock} label="Avg. Block Time (24h)">
					30.4 seconds
				</OverviewInfo>
				<OverviewInfo icon={Clock} label="Avg. Tx Per Block (24h)">
					10 transactions
                </OverviewInfo>
                */

export const Overview = (props: Props) => (
	<div className={s.wrapper}>
		<div className={[s.container, container.max960].join(" ")}>
			<div className={s.section}>
				<OverviewInfo
					icon={OverviewBlockIcon}
					label="Block Height"
					children={<Numeric type="integer" value={props.block.height} />}
				/>
				<OverviewInfo
					icon={OverviewBlockTimeIcon}
					label="Avg. Block Time (24h)"
					children="24.2 seconds"
				/>
			</div>
			<div className={s.section}>
				<OverviewInfo
					icon={OverviewTransactionIcon}
					label="Total Transactions"
					children={<Numeric type="integer" value={82712821} />}
				/>
				<OverviewInfo
					icon={OverviewBlockTransactionIcon}
					label="Avg. Tx per Block (24h)"
					children={<Numeric type="integer" value={123} />}
				/>
			</div>
			<div className={s.section}>
				<OverviewChart />
			</div>
		</div>
	</div>
);
