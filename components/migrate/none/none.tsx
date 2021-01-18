import MetaMaskOnboarding from "@metamask/onboarding";
import { Button, DivPx, Paragraph } from "@moai/core";
import s from "./none.module.css";

export const MigrateNone = (): JSX.Element => (
	<div>
		<Paragraph>
			Cannot detect any Ethereum provider. Please install one (e.g. MetaMask)
			and reload this page.
		</Paragraph>
		<DivPx size={16} />
		<div className={s.buttons}>
			<Button
				highlight
				onClick={() => {
					const onboarding = new MetaMaskOnboarding();
					onboarding.startOnboarding();
				}}
				children="Install MetaMask"
			/>
			<DivPx size={16} />
			<Button
				onClick={() => {
					window.location.reload();
				}}
				children="Reload"
			/>
		</div>
	</div>
);
