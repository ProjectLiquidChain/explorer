import { DivPx, Pagination, Pane } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Transfer } from "../transfer";
import { TransferTable } from "../table/table";
import s from "./pagination.module.css";

interface Props {
	transfers: Transfer[];
	page: number;
	totalPages: number;
}

export const TransferPagination = (props: Props): JSX.Element => {
	const router = useRouter();

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		await router.push(`/transfers/${page}`);
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Transfers</h1>
				<DivPx size={16} />
				<Pagination
					min={1}
					max={props.totalPages}
					value={props.page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Pane noPadding>
				<TransferTable transfers={props.transfers} />
			</Pane>
		</div>
	);
};
