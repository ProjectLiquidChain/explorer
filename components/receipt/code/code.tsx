import { Icon, text, Tooltip } from "@moai/core";
import { ExclamationCircle } from "@moai/icon/hrs";
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
		return <span className={text.successStrong}>Success</span>;
	if (format === "long")
		return <span className={text.failureStrong}>Error: {error}</span>;
	return (
		<Tooltip content={error}>
			<span>
				<span className={text.failureWeak}>
					<Icon display="inline" path={ExclamationCircle} size={16} />
				</span>
				<span className={text.failureStrong}> Error</span>
			</span>
		</Tooltip>
	);
};
