import { Button, dialogAlert, DivPx, Paragraph } from "@moai/core";
import { Dispatch, SetStateAction, useState } from "react";
import Web3 from "web3";
import { MigrateMode } from "../migrate";

interface Props {
	web3: Web3;
	setMode: Dispatch<SetStateAction<MigrateMode>>;
}

export const MigrateInstalled = (props: Props): JSX.Element => {
	const [busy, setBusy] = useState(false);

	const connect = async (): Promise<void> => {
		try {
			setBusy(true);
			const accounts = await props.web3.eth.requestAccounts();
			const address = accounts[0];
			props.setMode({ type: "connected", address });
			// Doesn't need to reset busy as setMode would trigger
			// an unmount of this component
		} catch (error) {
			setBusy(false);
			dialogAlert(["Cannot connect to your Ethereum provider", error.message]);
		}
	};

	return (
		<div>
			<Paragraph>
				An Ethereum provider is found. Click the button below to connect.
			</Paragraph>
			<DivPx size={16} />
			<Button
				highlight
				busy={busy}
				disabled={busy}
				onClick={() => connect()}
				children="Connect Ethereum Provider"
			/>
		</div>
	);
};
