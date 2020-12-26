import { ReactNode } from "react";
import { PaginationHeader, PaginationHeaderProps } from "./header/header";
import s from "./section.module.css";

interface Props {
	header: PaginationHeaderProps;
	children: ReactNode;
}

export const PaginationSection = (props: Props): JSX.Element => (
	<div className={s.container}>
		<div className={s.header}>
			<PaginationHeader {...props.header} />
		</div>
		<div className={s.body}>{props.children}</div>
	</div>
);
