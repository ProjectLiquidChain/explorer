import { Button, dialogAlert, DivPx, Input } from "@moai/core";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { ConnectedWeb3, MigrateBody, MigrateStep } from "../migrate";
import { EthUtilities } from "../utilities/utilities";
import s from "./connected.module.css";

interface Props {
	web3: ConnectedWeb3;
	setStep: Dispatch<SetStateAction<MigrateStep>>;
	submit: (body: MigrateBody) => void;
}

export const MigrateConnected = (props: Props): JSX.Element => {
	const [amountText, setAmountText] = useState("");
	const [lqtAddress, setLqtAddress] = useState("");

	const fillMax = async () => {
		const balance = await EthUtilities.getBalance(props.web3);
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

	const onSubmit: FormEventHandler = (event) => {
		event.preventDefault();
		const amount = parseFloat(amountText);
		props.submit({ web3: props.web3, amount, lqtAddress });
	};

	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="eth">From ETH Address</label>
			<DivPx size={4} />
			<Input id="eth" value={props.web3.address} readOnly />
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
