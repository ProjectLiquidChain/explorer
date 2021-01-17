import {
	Contract,
	ContractFunction,
	ContractParameter,
} from "@/components/contract/contract";
import { background, Tabs, text } from "@moai/core";
import { Fragment } from "react";
import s from "./overview.module.css";

interface Props {
	contract: Contract;
}

const Parameters = ({ parameters }: { parameters: ContractParameter[] }) => (
	<>
		<span className={text.muted}>(</span>
		{parameters.map((parameter, index) => (
			<Fragment key={parameter.name}>
				{index !== 0 && <span className={text.muted}>, </span>}
				<span className={text.highlightStrong}>{parameter.type}</span>
				<span> </span>
				<span>{parameter.name}</span>
			</Fragment>
		))}
		<span className={text.muted}>)</span>
	</>
);

const renderFunction = (func: ContractFunction, index: number): JSX.Element => (
	<li key={func.name} className={index % 2 === 0 ? background.weak : ""}>
		<span>{func.name}</span>
		<Parameters parameters={func.parameters} />
	</li>
);

const Code = ({ functions }: { functions: ContractFunction[] }) => (
	<div className={s.wrapper}>
		<ol className={s.code}>{functions.map(renderFunction)}</ol>
	</div>
);

export const ContractOverview = ({ contract }: Props) => (
	<Tabs>
		{[
			{
				id: "functions",
				title: "Functions",
				pane: () => <Code functions={contract.header.functions} />,
			},
			{
				id: "events",
				title: "Events",
				pane: () => <Code functions={contract.header.events} />,
			},
		]}
	</Tabs>
);
