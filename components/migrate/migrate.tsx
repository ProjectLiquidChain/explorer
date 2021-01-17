import detectEthereumProvider from "@metamask/detect-provider";
import {
	background,
	border,
	Button,
	DivPx,
	FormField,
	Input,
	Pane,
	shadow,
} from "@moai/core";
import { useEffect, useState } from "react";
import s from "./migrate.module.css";

export const Migrate = () => {
	const [eth, setEth] = useState("");
	const [lqt, setLqt] = useState("");
	const [amount, setAmount] = useState("");

	useEffect(() => {});

	const form = (
		<form className={s.form}>
			<label htmlFor="eth">From ETH Address</label>
			<DivPx size={4} />
			<Input id="eth" value={eth} readOnly />
			<DivPx size={16} />
			<label htmlFor="lqt">To LQT Address</label>
			<DivPx size={4} />
			<Input id="lqt" value={lqt} setValue={setLqt} />
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

	return (
		<div
			className={[
				s.container,
				background.strong,
				border.strong,
				shadow.boxStrong,
			].join(" ")}
			children={form}
		/>
	);
};
