import { Button, ButtonGroup } from "@moai/core";
import { ChevronLeft, ChevronRight } from "@moai/icon/hrs";
import { useCallback, useState } from "react";
import { Numeric } from "../numeric/numeric";

export interface PaginationProps {
	current: number;
	total: number;
	onPageChange: (num: number) => Promise<void>;
}

export const Pagination = (props: PaginationProps): JSX.Element => {
	const [busy, setBusy] = useState(false);

	const { onPageChange } = props;
	const onClick = useCallback(async (page: number) => {
		setBusy(true);
		await onPageChange(page);
		setBusy(false)
	}, [onPageChange])

	return (
		<ButtonGroup>
			<Button
				icon={ChevronLeft}
				iconLabel="Previous"
				disabled={props.current === 0}
				onClick={() => onClick(props.current - 1)}
			/>
			<Button busy={busy}>
				<Numeric type="integer" value={props.current} />
				<span>/</span>
				<Numeric type="integer" value={props.total} />
			</Button>
			<Button
				icon={ChevronRight}
				iconLabel="Next"
				disabled={props.current === props.total}
				onClick={() => onClick(props.current + 1)}
			/>
		</ButtonGroup>
	);
};
