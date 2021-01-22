import { Account as LQCAccount } from "liquid-chain";
import Web3 from "web3";
import { ConnectedWeb3 } from "../migrate";
import migrateAbi from "./abi-migrate.json";
import qashAbi from "./abi-qash.json";

const QASH_DECIMAL_STRING = process.env.NEXT_PUBLIC_QASH_DECIMAL;
const QASH_CONTRACT = process.env.NEXT_PUBLIC_QASH_CONTRACT;
const MIGRATION_CONTRACT = process.env.NEXT_PUBLIC_MIGRATION_CONTRACT;

if (QASH_DECIMAL_STRING === undefined) throw Error("Missing env QASH DECIMAL");
if (QASH_CONTRACT === undefined) throw Error("Missing env QASH_CONTRACT");
if (MIGRATION_CONTRACT === undefined) throw Error("Missing env MIGRATION_CONTRACT"); // prettier-ignore

const QASH_DECIMAL = parseInt(QASH_DECIMAL_STRING);
if (Number.isNaN(QASH_DECIMAL)) throw Error("QASH_DECIMAL is not a number");

const buildEthObject = (
	web3: Web3,
	func: string,
	args: string[] = []
): string => {
	const sha3 = web3.utils.sha3(func);
	if (sha3 === null) throw Error("Sha3 of func is null");
	const hex = sha3.substr(0, 10);
	const val = args.reduce((prev, arg) => {
		return prev + web3.utils.padLeft(arg, 64);
	}, "");
	const data = hex + val;
	return data;
};

/**
 * Returns account balance
 */
const getBalance = async (web3: ConnectedWeb3): Promise<number> => {
	const data = buildEthObject(web3.value, "balanceOf(address)", [
		web3.address.substr(2),
	]);
	const response = await web3.value.eth.call({ to: QASH_CONTRACT, data });
	const satoshi = web3.value.utils.toDecimal(response);
	return satoshi / 10 ** QASH_DECIMAL;
};

const getAllowance = async (web3: ConnectedWeb3): Promise<number> => {
	const data = buildEthObject(web3.value, "allowance(address,address)", [
		web3.address.substr(2),
		MIGRATION_CONTRACT.substr(2),
	]);
	const response = await web3.value.eth.call({ to: QASH_CONTRACT, data });
	const satoshi = web3.value.utils.toDecimal(response);
	return satoshi / 10 ** QASH_DECIMAL;
};

/**
 * Approve migration contract to transfer
 */
const approve = async (
	web3: ConnectedWeb3,
	rawAmount: number
): Promise<void> => {
	const amount = rawAmount * 10 ** QASH_DECIMAL;
	const qashContract = new web3.value.eth.Contract(qashAbi as any);
	await web3.value.eth.sendTransaction({
		from: web3.address,
		to: EthUtilities.QASH_CONTRACT,
		value: "0x00",
		data: qashContract.methods.approve(MIGRATION_CONTRACT, amount).encodeABI(),
	});
};

/**
 * Lock amount to transfer
 */
const lock = async (
	web3: ConnectedWeb3,
	rawAmount: number,
	lqtAddress: string
): Promise<void> => {
	const amount = rawAmount * 10 ** QASH_DECIMAL;
	const migrationContract = new web3.value.eth.Contract(migrateAbi as any);
	const { publicKey } = LQCAccount.fromString(lqtAddress);
	await web3.value.eth.sendTransaction({
		to: MIGRATION_CONTRACT,
		from: web3.address,
		value: "0x00",
		data: migrationContract.methods
			.lock(amount, `0x${publicKey.toString("hex")}`)
			.encodeABI(),
	});
};

export const EthUtilities = {
	QASH_DECIMAL,
	QASH_CONTRACT,
	MIGRATION_CONTRACT,
	getAllowance,
	getBalance,
	approve,
	lock,
};
