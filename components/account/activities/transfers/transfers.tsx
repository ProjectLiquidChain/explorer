import { Pagination } from "@/components/pagination/pagination";
import { TransactionTableWide } from "@/components/transaction/table/wide/wide";
import { TransactionBundle } from "@/components/transaction/transaction";
import { TransferTable } from "@/components/transfer/table/table";
import { Transfer } from "@/components/transfer/transfer";
import { Border, Paragraph } from "@moai/core";
import { useCallback, useState } from "react";
import { Account } from "../../account";
import { getAccountTransactions, getAccountTransfers } from "../../fetch/fetch";
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
		async (page): Promise<void> => {
			const result = await getAccountTransfers({ address, page });
			setTransfers(result.transfers);
			setPage(page);
		},
		[address]
	);

	// NOTE: use initial value, not the paginated value in state
	return props.transfers.length === 0 ? (
		<Paragraph>No recent transfers</Paragraph>
	) : (
		<div>
			<div className={s.pagination}>
				<Pagination
					total={props.totalPages - 1}
					current={page}
					onPageChange={onPageChange}
				/>
			</div>
            <Border color="weak" />
			<TransferTable transfers={transfers} />
		</div>
	);
};
