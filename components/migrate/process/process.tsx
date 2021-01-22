import { AccountAddress } from "@/components/account/address/address";
import { Button, DivPx, Paragraph } from "@moai/core";
import { Dispatch, SetStateAction } from "react";
import { MigrateProcessData, MigrateStep } from "../migrate";
import { MigrateProcessItem } from "./item/item";

interface Props {
	data: MigrateProcessData;
	setStep: Dispatch<SetStateAction<MigrateStep>>;
}

export const MigrateProcess = ({ data, setStep }: Props): JSX.Element => (
	<div>
		<Paragraph>
			<span>Migrating {data.body.amount} QASH to </span>
			<span>
				<AccountAddress value={data.body.lqtAddress} wrap />
			</span>
			<span> on Liquid Chain:</span>
		</Paragraph>
		<DivPx size={8} />
		<div>
			{data.status === "approving" ? (
				<MigrateProcessItem
					status="busy"
					label="Step 1/2: Approving QASH for migration"
				/>
			) : (
				<MigrateProcessItem
					status="done"
					label="Step 1/2: QASH Approved for migration"
				/>
			)}
			{data.status === "approving" ? null : data.status === "locking" ? (
				<MigrateProcessItem
					status="busy"
					label="Step 2/2: Locking QASH for migration"
				/>
			) : (
				<MigrateProcessItem
					status="done"
					label="Step 2/2: QASH locked for migration"
				/>
			)}
			{data.status === "done" && (
				<>
					<DivPx size={8} />
					<Paragraph>
						Done. {data.body.amount} QASH is migrated to Liquid Chain.
					</Paragraph>
					<DivPx size={16} />
					<Button
						highlight
						onClick={() => {
							const { web3 } = data.body;
							setStep({ type: "connected", data: { web3 } });
						}}
						children="Back"
					/>
				</>
			)}
		</div>
	</div>
);
