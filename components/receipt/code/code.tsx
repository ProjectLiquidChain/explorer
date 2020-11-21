import { Receipt } from "@/components/transaction/transaction";
import { DivPx, Icon, text, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
import s from "./code.module.css";

interface Props {
	code: Receipt["code"];
}

const codeError: Map<number, string> = new Map([
	[1, "Out of gas"],
	[2, "Ignite error"],
	[3, "Contract not found"],
	[4, "Method not found"],
]);

export const ReceiptCode = ({ code }: Props) => {
	const error = codeError.get(code);
	return error === undefined ? (
		<div className={s.success}>Success</div>
	) : (
		<Tooltip content={error}>
			<div className={s.error}>
				<Icon path={icons.error} size={16} />
				<DivPx size={8} />
				<span>Error</span>
			</div>
		</Tooltip>
	);
};
