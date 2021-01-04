import { DivPx, Pagination, Pane } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Block } from "../block";
import { BlockTableWide } from "../table/wide/wide";
import s from "./pagination.module.css";

interface Props {
	blocks: Block[];
	page: number;
	totalPages: number;
}

export const BlockPagination = (props: Props): JSX.Element => {
	const router = useRouter();

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		await router.push(`/blocks/${page}`);
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Blocks</h1>
				<DivPx size={16} />
				<Pagination
					min={1}
					max={props.totalPages}
					value={props.page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Pane noPadding>
				<BlockTableWide blocks={props.blocks} />
			</Pane>
		</div>
	);
};
