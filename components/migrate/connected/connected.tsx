import { Button, DivPx, Input } from "@moai/core";
import { useState } from "react";
import s from "./form.module.css";

interface Props {
	ethAddress: string;
}

export const MigrateConnected = (props: Props): JSX.Element => {
	const [lqtAddress, setLqtAddress] = useState("");
	const [amount, setAmount] = useState("");

	return (
		<form className={s.form}>
			<label htmlFor="eth">From ETH Address</label>
			<DivPx size={4} />
			<Input id="eth" value={props.ethAddress} readOnly />
			<DivPx size={16} />
			<label htmlFor="lqt">To LQT Address</label>
			<DivPx size={4} />
			<Input id="lqt" value={lqtAddress} setValue={setLqtAddress} />
			<DivPx size={16} />
			<label htmlFor="amount">Amount</label>
			<DivPx size={4} />
			<Input id="amount" value={amount} setValue={setAmount} />
			<DivPx size={16} />
			<div className={s.submit}>
				<Button fill highlight type="submit">
					Migrate
				</Button>
			</div>
		</form>
	);
};
