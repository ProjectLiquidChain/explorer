import {
	Contract,
	ContractFunction,
	ContractParameter,
} from "@/components/contract/contract";
import { Heading } from "@/components/heading/heading";
import { Pane } from "@/components/pane/pane";
import { background, DivPx, text } from "@moai/core";
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
				<span className={text.blueStrong}>{parameter.type}</span>
				<span> </span>
				<span>{parameter.name}</span>
			</Fragment>
		))}
		<span className={text.muted}>)</span>
	</>
);

const Code = ({ functions }: { functions: ContractFunction[] }) => (
	<Pane>
		<div className={s.wrapper}>
			<ol className={s.code}>
				{functions.map((func, index) => (
					<li
						key={func.name}
						className={index % 2 === 0 ? background.secondary : ""}
					>
						<span>{func.name}</span>
						<Parameters parameters={func.parameters} />
					</li>
				))}
			</ol>
		</div>
	</Pane>
);

export const ContractOverview = ({ contract }: Props) => (
	<div>
		<Heading>Contract Functions</Heading>
		<Code functions={contract.header.functions} />
		<DivPx size={16} />
		<Heading>Contract Events</Heading>
		<Code functions={contract.header.events} />
	</div>
);
