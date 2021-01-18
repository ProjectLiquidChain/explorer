import { Button, DivPx, Paragraph } from "@moai/core";
import { Dispatch, SetStateAction } from "react";
import Web3 from "web3";
import { MigrateMode } from "../migrate";

interface Props {
	web3: Web3;
	setMode: Dispatch<SetStateAction<MigrateMode>>;
}

export const MigrateInstalled = (props: Props): JSX.Element => (
	<div>
		<Paragraph>
			An Ethereum provider is found. Click the button below to connect.
		</Paragraph>
		<DivPx size={16} />
		<Button
			highlight
			onClick={async () => {
				const accounts = await props.web3.eth.requestAccounts();
				const address = accounts[0];
				props.setMode({ type: "connected", address });
			}}
			children="Connect Ethereum"
		/>
	</div>
);
