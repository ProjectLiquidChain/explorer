import { Contract, ContractEvent } from "@/components/contract/contract";
import { Tag } from "@moai/core";
import { Table } from "../table/table";

interface Props {
	contract: Contract;
}

interface EventProps {
	events: Contract["header"]["events"];
}

const Parameters = ({ event }: { event: ContractEvent }) => (
	<div>
		{event.parameters.map((param) => (
			<Tag key={param.name} children={`${param.name}: ${param.type}`} />
		))}
	</div>
);

const Events = ({ events }: EventProps): JSX.Element => (
	<Table
		columns={[
			{
				title: "Name",
				render: (i) => events[i].name,
			},
			{
				title: "Parameters",
				render: (i) => <Parameters event={events[i]} />,
			},
		]}
		rowKey={(i) => events[i].name}
		rowsLength={events.length}
	/>
);

export const ContractOverview = ({ contract }: Props) => (
	<div>
		<Events events={contract.header.events} />
		<Events events={contract.header.functions} />
	</div>
);
