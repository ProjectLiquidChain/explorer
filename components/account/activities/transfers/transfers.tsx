import { TransferTable } from "@/components/transfer/table/table";
import { Transfer } from "@/components/transfer/transfer";
import { Border, Pagination, Paragraph } from "@moai/core";
import { useCallback, useState } from "react";
import { Account } from "../../account";
import { getAccountTransfers } from "../../fetch/fetch";
import s from "./transfers.module.css";

interface Props {
	address: Account["address"];
	transfers: Transfer[];
	totalPages: number;
}

export const AccountActivitiesTransfers = (props: Props): JSX.Element => {
	const [transfers, setTransfers] = useState(props.transfers);
	const [page, setPage] = useState<number>(0);

	const { address } = props;
	const onPageChange = useCallback(
		async (page1): Promise<void> => {
			const page = page1 - 1;
			const result = await getAccountTransfers({ address, page });
			setTransfers(result.transfers);
			setPage(page);
		},
		[address]
	);

	// NOTE: use initial value, not the paginated value in state
	return props.transfers.length === 0 ? (
		<div className={s.header}>
			<Paragraph>No recent transfers</Paragraph>
		</div>
	) : (
		<div>
			<div className={s.header}>
				<Pagination
					max={props.totalPages}
					min={1}
					value={page + 1}
					setValue={onPageChange}
				/>
			</div>
			<Border color="weak" />
			<TransferTable transfers={transfers} />
		</div>
	);
};
