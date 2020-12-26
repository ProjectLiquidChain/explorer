import { Button, ButtonGroup, coreIcons, Input, Popover } from "@moai/core";
import { ChevronLeft, ChevronRight } from "@moai/icon/hrs";
import { useCallback, useState } from "react";
import { Numeric } from "../numeric/numeric";
import { PaginationInput } from "./input/input";

export interface PaginationProps {
	current: number;
	total: number;
	onPageChange: (num: number) => Promise<void>;
}

export const Pagination = (props: PaginationProps): JSX.Element => {
	const [busy, setBusy] = useState(false);

	const { onPageChange: orgOnPageChange } = props;
	const onPageChange = useCallback(
		async (page: number) => {
			setBusy(true);
			await orgOnPageChange(page);
			setBusy(false);
		},
		[orgOnPageChange]
	);

	return (
		<ButtonGroup skipChildTypeCheck>
			<Button
				icon={ChevronLeft}
				iconLabel="Previous"
				disabled={props.current === 0}
				onClick={() => onPageChange(props.current - 1)}
			/>
			<Popover
				content={(popover) => (
					<PaginationInput
						page={props.current}
						onPageChange={(page) => {
							onPageChange(page);
							popover.close();
						}}
					/>
				)}
				target={(popover) => (
					<Button
						busy={busy}
						icon={coreIcons["caret"]}
						reverse
						selected={popover.opened}
						onClick={popover.toggle}
					>
						<Numeric type="integer" value={props.current} />
						<span>/</span>
						<Numeric type="integer" value={props.total} />
					</Button>
				)}
			/>
			<Button
				icon={ChevronRight}
				iconLabel="Next"
				disabled={props.current === props.total}
				onClick={() => onPageChange(props.current + 1)}
			/>
		</ButtonGroup>
	);
};
