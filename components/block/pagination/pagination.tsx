import { Pagination } from "@/components/pagination/pagination";
import { DivPx, Pane } from "@moai/core";
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

	const onPageChange = useCallback(async (page: number): Promise<void> => {
		const { blocks } = await getRecentBlocks({ page });
		setBlocks(blocks);
		setPage(page);
		const url = `/blocks?page=${page}`;
		await router.push(url, undefined, { shallow: true });
	}, []);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Recent Blocks</h1>
				<DivPx size={16} />
				<Pagination
					total={props.totalPages - 1}
					current={page}
					onPageChange={onPageChange}
				/>
			</div>
			<Pane noPadding>
				<BlockTableWide blocks={blocks} />
			</Pane>
		</div>
	);
};
