import { Icon, text, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
import { Receipt } from "../receipt";
import s from "./code.module.css";

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
		return <span className={text.positive}>Success</span>;
	if (format === "long")
		return <div className={text.negative}>Error: {error}</div>;
	return (
		<Tooltip content={error}>
			<span className={text.negative}>
				<Icon display="inline" path={icons.error} size={16} />
				<span> Error</span>
			</span>
		</Tooltip>
	);
};
