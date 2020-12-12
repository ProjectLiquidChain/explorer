import { Icon, text, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
import { Receipt } from "../receipt";

interface Props {
	code: Receipt["code"];
	format: "long" | "short";
}

const codeError: Map<number, string> = new Map([
	[1, "Out of gas"],
	[2, "Ignite error"],
	[3, "Contract not found"],
	[4, "Method not found"],
]);

export const ReceiptCode = ({ code, format }: Props) => {
	const error = codeError.get(code);
	if (error === undefined)
		return <span className={text.greenStrong}>Success</span>;
	if (format === "long")
		return <span className={text.redStrong}>Error: {error}</span>;
	return (
		<Tooltip content={error}>
			<span>
				<span className={text.redWeak}>
					<Icon display="inline" path={icons.error} size={16} />
				</span>
				<span className={text.redStrong}> Error</span>
			</span>
		</Tooltip>
	);
};
