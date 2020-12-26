import * as P from "@/components/pagination/pagination";
import { DivPx, ProgressCircle } from "@moai/core";
import s from "./header.module.css";

export interface PaginationHeaderProps {
	heading: React.ReactNode;
	pagination: P.PaginationProps;
	busy: boolean;
}

export const PaginationHeader = (props: PaginationHeaderProps): JSX.Element => (
	<div className={s.container}>
		<h2 className={s.heading} children={props.heading} />
		<div className={s.pagination}>
			<P.Pagination {...props.pagination} />
			<DivPx size={16} />
			{props.busy && (
				<ProgressCircle value={null} size={16} color="highlight" />
			)}
		</div>
	</div>
);
