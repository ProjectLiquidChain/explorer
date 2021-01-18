import { Button, dialogAlert, DivPx, Input } from "@moai/core";
import { useState } from "react";
import Web3 from "web3";
import s from "./connected.module.css";

interface Props {
	web3: Web3;
	ethAddress: string;
}

interface State {
	lqtAddress: string;
	amount: string;
}

const QASH_DECIMAL = 6;
const QASH_CONTRACT = "0x26a5aa91fd630a18323087e3ae88ccd2fccfd136";
const MIGRATION_CONRTRACT = "0xf3117d7ee5c93f901413c20a350b178534fe6640";

const migrate = async (props: Props, state: State): Promise<void> => {
	// const { publicKey } = Account.fromString(state.lqtAddress);
	// @TODO: Provide these values
	const publicKey: any = {};
	const qashAbi: any = {};
	const abi: any = {};

	// Approve migration contract to transfer
	const amount = parseFloat(state.amount) * 10 ** QASH_DECIMAL;
	const qashContract = new props.web3.eth.Contract(qashAbi);
	await props.web3.eth.sendTransaction({
		to: QASH_CONTRACT,
		from: props.ethAddress,
		value: "0x00",
		data: qashContract.methods.approve(MIGRATION_CONRTRACT, amount).encodeABI(),
	});

	// Lock amount
	const migrationContract = new props.web3.eth.Contract(abi);
	await props.web3.eth.sendTransaction({
		to: MIGRATION_CONRTRACT,
		from: props.ethAddress,
		value: "0x00",
		data: migrationContract.methods
			.lock(amount, `0x${publicKey.toString("hex")}`)
			.encodeABI(),
	});
};

export const MigrateConnected = (props: Props): JSX.Element => {
	const [lqtAddress, setLqtAddress] = useState("");
	const [amount, setAmount] = useState("");

	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				try {
					await migrate(props, { amount, lqtAddress });
				} catch (error) {
					dialogAlert(["Cannot migrate your token", error.message]);
				}
			}}
		>
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
				<Button fill highlight type="submit" children="Migrate" />
			</div>
		</form>
	);
};
