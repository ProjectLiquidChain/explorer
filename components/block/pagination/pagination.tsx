import { DivPx, Pane, Pagination } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Block } from "../block";
import { getRecentBlocks } from "../fetch/fetch";
import { BlockTableWide } from "../table/wide/wide";
import s from "./pagination.module.css";

interface Props {
	blocks: Block[];
	page: number;
	totalPages: number;
}

export const BlockPagination = (props: Props): JSX.Element => {
	const router = useRouter();

	const [blocks, setBlocks] = useState(props.blocks);
	const [page, setPage] = useState(props.page);

	const onPageChange = useCallback(async (page1: number): Promise<void> => {
		// page1 is 1-based indexed
		const page = page1 - 1;
		const { blocks } = await getRecentBlocks({ page });
		setBlocks(blocks);
		setPage(page);
		const url = `/blocks?page=${page1}`;
		await router.push(url, undefined, { shallow: true });
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Blocks</h1>
				<DivPx size={16} />
				<Pagination
					min={1}
					max={props.totalPages}
					value={page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Pane noPadding>
				<BlockTableWide blocks={blocks} />
			</Pane>
		</div>
	);
};
