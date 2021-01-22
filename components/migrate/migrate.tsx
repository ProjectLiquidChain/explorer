import detectEthereumProvider from "@metamask/detect-provider";
import { dialogAlert, ProgressCircle, Steps } from "@moai/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Web3 from "web3";
import { MigrateConnected } from "./connected/connected";
import { MigrateInstalled } from "./installed/installed";
import s from "./migrate.module.css";
import { MigrateNone } from "./none/none";
import { MigrateProcess } from "./process/process";
import { EthUtilities } from "./utilities/utilities";

export type MigrateProcessStatus = "approving" | "locking" | "done";

// Just to be sure, because web3 may not connected (and thus having no
// address/account)
export interface ConnectedWeb3 {
	value: Web3;
	address: string;
}

export interface MigrateBody {
	web3: ConnectedWeb3;
	amount: number;
	lqtAddress: string;
}

export interface MigrateProcessData {
	status: MigrateProcessStatus;
	body: MigrateBody;
}

export type MigrateStep =
	// Don't know anything yet
	| { type: "initializing" }
	// MetaMask is not installed
	| { type: "none" }
	// MetaMask is installed but not connected
	| { type: "installed"; data: { web3: Web3 } }
	// MetaMask is installed and connected
	| { type: "connected"; data: { web3: ConnectedWeb3 } }
	// Making migration
	| { type: "migrating"; data: MigrateProcessData };

const STEP_INDEX: Record<MigrateStep["type"], number> = {
	initializing: 0,
	none: 0,
	installed: 0,
	connected: 1,
	migrating: 2,
};

type SetStep = Dispatch<SetStateAction<MigrateStep>>;

const init = async (setStep: SetStep): Promise<void> => {
	const ethereum = await detectEthereumProvider();
	if (ethereum === null) {
		setStep({ type: "none" });
	} else {
		const web3 = new Web3(ethereum as any);
		const addresses = await web3.eth.getAccounts();
		if (addresses.length === 0) {
			setStep({ type: "installed", data: { web3 } });
		} else {
			const connected: ConnectedWeb3 = { value: web3, address: addresses[0] };
			setStep({ type: "connected", data: { web3: connected } });
		}
	}
};

const submit = async (setStep: SetStep, body: MigrateBody): Promise<void> => {
	try {
		const { web3, amount, lqtAddress } = body;
		setStep({ type: "migrating", data: { body, status: "approving" } });
		await EthUtilities.approve(web3, amount);
		setStep({ type: "migrating", data: { body, status: "locking" } });
		await EthUtilities.lock(web3, amount, lqtAddress);
		setStep({ type: "migrating", data: { body, status: "done" } });
	} catch (error) {
		await dialogAlert(["Cannot migrate your token", error.message]);
		setStep({ type: "connected", data: { web3: body.web3 } });
	}
};

const Initializing = (): JSX.Element => (
	<ProgressCircle
		size={16}
		value="indeterminate"
		color={ProgressCircle.colors.highlight}
	/>
);

export const Migrate = (): JSX.Element => {
	const [step, setStep] = useState<MigrateStep>({ type: "initializing" });

	useEffect(() => {
		init(setStep);
	}, []);

	const children = ((): JSX.Element => {
		switch (step.type) {
			case "initializing":
				return <Initializing />;
			case "none":
				return <MigrateNone />;
			case "installed":
				return <MigrateInstalled web3={step.data.web3} setStep={setStep} />;
			case "connected":
				return (
					<MigrateConnected
						web3={step.data.web3}
						submit={submit.bind(null, setStep)}
						setStep={setStep}
					/>
				);
			case "migrating":
				return <MigrateProcess data={step.data} setStep={setStep} />;
		}
	})();

	return (
		<div className={s.container}>
			<Steps
				current={STEP_INDEX[step.type]}
				steps={[
					{ title: "Connect" },
					{ title: "Migrate" },
					{ title: "Result" },
				]}
			/>
			<div className={s.body}>{children}</div>
		</div>
	);
};
