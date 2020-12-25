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

const Infos = (props: Props): JSX.Element => (
	<div className={s.infos}>
		<div className={s.info}>
			<OverviewInfo
				icon={OverviewBlockIcon}
				label="Block Height"
				children={<Numeric type="integer" value={props.block.height} />}
			/>
		</div>
		<div className={s.info}>
			<OverviewInfo
				icon={OverviewBlockTimeIcon}
				label="Avg. Block Time (24h)"
				children="24.2 seconds"
			/>
		</div>
		<div className={s.info}>
			<OverviewInfo
				icon={OverviewTransactionIcon}
				label="Total Transactions"
				children={<Numeric type="integer" value={82712821} />}
			/>
		</div>
		<div className={s.info}>
			<OverviewInfo
				icon={OverviewBlockTransactionIcon}
				label="Avg. Tx per Block (24h)"
				children={<Numeric type="integer" value={123} />}
			/>
		</div>
	</div>
);

export const Overview = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<div className={[s.container, container.max960].join(" ")}>
			<div className={s.title}>Liquid Chain Explorer</div>
			<div className={s.body}>
				<Infos {...props} />
				<div className={s.chart}>
					<OverviewChart />
				</div>
			</div>
		</div>
	</div>
);
