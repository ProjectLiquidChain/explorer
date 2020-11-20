import { Tooltip, Button, text } from "@moai/core";
import { icons } from "@moai/icon";
import { useState } from "react";

interface Props {
	text: string;
}

export const CopyButton = (props: Props): JSX.Element => {
	const [copied, setCopied] = useState(false);
	return (
		<Tooltip content="Copy to clipboard">
			<div className={text.muted}>
				<Button
					icon={copied ? icons.tick : icons.duplicate}
					style={Button.style.flat}
					onClick={async () => {
						await navigator.clipboard.writeText(props.text);
						setCopied(true);
						window.setTimeout(() => setCopied(false), 1000);
					}}
				/>
			</div>
		</Tooltip>
	);
};
