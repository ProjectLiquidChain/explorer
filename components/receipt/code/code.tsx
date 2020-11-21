import { Receipt } from "@/components/transaction/transaction";
import { DivPx, Icon, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
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
	if (error === undefined) return <div className={s.positive}>Success</div>;
	if (format === "long")
		return <div className={s.negative}>Error: {error}</div>;
	return (
		<Tooltip content={error}>
			<div className={[s.negative, s.flex].join(" ")}>
				<Icon path={icons.error} size={16} />
				<DivPx size={8} />
				<span>Error</span>
			</div>
		</Tooltip>
	);
};
