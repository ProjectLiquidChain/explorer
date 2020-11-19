import { Tooltip, Button, text } from "@moai/core";
import { icons } from "@moai/icon";

interface Props {
    text: string;
}

export const CopyButton = (props: Props): JSX.Element => (
	<Tooltip content="Copy to clipboard">
		<div className={text.muted}>
			<Button
				icon={icons.duplicate}
				style={Button.style.flat}
				onClick={() => {
					navigator.clipboard.writeText(props.text);
				}}
			/>
		</div>
	</Tooltip>
);
