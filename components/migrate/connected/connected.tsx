import { Button, dialogAlert, DivPx, Input } from "@moai/core";
import { FormEvent, useState } from "react";
import Web3 from "web3";
import s from "./connected.module.css";
import { EthUtilities } from "./utilities/utilities";

interface Props {
	web3: Web3;
	ethAddress: string;
}

export const MigrateConnected = (props: Props): JSX.Element => {
	const { web3, ethAddress } = props;

	const [lqtAddress, setLqtAddress] = useState("");
	const [amountText, setAmountText] = useState("");

	const submit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const amount = parseInt(amountText);
			await EthUtilities.approve({ web3, ethAddress, amount });
			await EthUtilities.lock({ web3, amount, lqtAddress, ethAddress });
		} catch (error) {
			dialogAlert(["Cannot migrate your token", error.message]);
		}
	};

	const fillMax = async () => {
		const params = { web3, ethAddress };
		const balance = await EthUtilities.getBalance(params);
		setAmountText(balance.toString());
	};

	const fillClipboard = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setLqtAddress(text);
		} catch (error) {
			dialogAlert("Cannot read from clipboard");
		}
	};

	return (
		<form onSubmit={submit}>
			<label htmlFor="eth">From ETH Address</label>
			<DivPx size={4} />
			<Input id="eth" value={props.ethAddress} readOnly />
			<DivPx size={16} />
			<label htmlFor="lqt">To LQT Address</label>
			<DivPx size={4} />
			<div className={s.flex}>
				<div className={s.input}>
					<Input id="lqt" value={lqtAddress} setValue={setLqtAddress} />
				</div>
				<DivPx size={8} />
				<div className={s.button}>
					<Button fill onClick={fillClipboard} children="Paste clipboard" />
				</div>
			</div>
			<DivPx size={16} />
			<label htmlFor="amount">QASH Amount</label>
			<DivPx size={4} />
			<div className={s.flex}>
				<div className={s.input}>
					<Input id="amount" value={amountText} setValue={setAmountText} />
				</div>
				<DivPx size={8} />
				<div className={s.button}>
					<Button fill onClick={fillMax} children="Use all balance" />
				</div>
			</div>
			<DivPx size={16} />
			<div className={s.submit}>
				<Button fill highlight type="submit" children="Migrate" />
			</div>
		</form>
	);
};
