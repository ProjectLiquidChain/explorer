import { Account, isContractAccount } from "@/components/account/account";
import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@moai/core";
import { AccountAddress } from "../address/address";

interface Props {
	account: Account;
}

export const AccountOverview = ({ account }: Props) => (
	<Pane>
		<Info
			label="Account Nonce"
			help="Sequential running number of this address, beginning with 0 for the first transaction. For example, if the nonce is 10, the address has sent 11 transactions."
			children={<Numeric type="integer" value={account.nonce} />}
		/>
		{isContractAccount(account) && (
			<>
				<Divider />
				<Info
					label="Contract hash"
					copy={account.contractHash}
					children={account.contractHash}
				/>
				<Divider />
				<Info
					label="Account creator"
					copy={account.creator}
					children={<AccountAddress wrap value={account.creator} />}
				/>
				<Divider />
				<Info
					label="Storage hash"
					copy={account.storageHash}
					children={account.storageHash}
				/>
			</>
		)}
	</Pane>
);
