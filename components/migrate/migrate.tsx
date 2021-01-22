import detectEthereumProvider from "@metamask/detect-provider";
import { ProgressCircle, Steps } from "@moai/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Web3 from "web3";
import { MigrateConnected } from "./connected/connected";
import { MigrateInstalled } from "./installed/installed";
import { MigrateNone } from "./none/none";
import { MigrateProcess } from "./process/process";
import s from "./migrate.module.css";

export type MigrateProcessStatus = "approving" | "locking" | "done";

export type MigrateMode =
	| { type: "initializing" } // Don't know anything yet
	| { type: "none" } // MetaMask is not installed
	| { type: "installed"; web3: Web3 } // MetaMask is installed but not connected
	| { type: "connected"; web3: Web3; address: string } // MetaMask is installed and connected
	| { type: "migrating"; progress: MigrateProcessStatus }; // Making migration

const MIGRATE_STEP: Record<MigrateMode["type"], number> = {
	initializing: 0,
	none: 0,
	installed: 0,
	connected: 1,
	migrating: 2,
};

const init = async (setMode: Dispatch<SetStateAction<MigrateMode>>) => {
	const ethereum = await detectEthereumProvider();
	if (ethereum === null) {
		setMode({ type: "none" });
	} else {
		const web3 = new Web3(ethereum as any);
		const addresses = await web3.eth.getAccounts();
		if (addresses.length === 0) {
			setMode({ type: "installed", web3 });
		} else {
			setMode({ type: "connected", web3, address: addresses[0] });
		}
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
	const [mode, setMode] = useState<MigrateMode>({ type: "initializing" });

	useEffect(() => {
		init(setMode);
	}, []);

	const children = ((): JSX.Element => {
		switch (mode.type) {
			case "initializing":
				return <Initializing />;
			case "none":
				return <MigrateNone />;
			case "installed":
				return <MigrateInstalled web3={mode.web3} setMode={setMode} />;
			case "connected":
				return <MigrateConnected web3={mode.web3} ethAddress={mode.address} />;
			case "migrating":
				return <MigrateProcess />;
		}
	})();

	return (
		<div className={s.container}>
			<Steps
				current={MIGRATE_STEP[mode.type]}
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
