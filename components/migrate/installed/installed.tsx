import { Button, dialogAlert, DivPx, Paragraph } from "@moai/core";
import { Dispatch, SetStateAction, useState } from "react";
import Web3 from "web3";
import { ConnectedWeb3, MigrateStep } from "../migrate";

interface Props {
	web3: Web3;
	setStep: Dispatch<SetStateAction<MigrateStep>>;
}

export const MigrateInstalled = (props: Props): JSX.Element => {
	const [busy, setBusy] = useState(false);

	const connect = async (): Promise<void> => {
		try {
			setBusy(true);
			const accounts = await props.web3.eth.requestAccounts();
			const address = accounts[0];
			const connected: ConnectedWeb3 = { value: props.web3, address };
			props.setStep({ type: "connected", data: { web3: connected } });
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
