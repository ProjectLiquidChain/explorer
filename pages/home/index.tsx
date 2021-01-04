import { Block } from "@/components/block/block";
import { getRecentBlocks } from "@/components/block/fetch/fetch";
import { container } from "@/components/container/container";
import { Feed } from "@/components/feed/feed";
import { PageErrorProps } from "@/components/page/error/error";
import { Page, PageDefaultHead } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { getStatus } from "@/components/status/fetch/fetch";
import { StatusOverview } from "@/components/status/overview/overview";
import { Status } from "@/components/status/status";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { TransactionBundle } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { GetStaticProps } from "next";
import * as React from "react";

interface Props {
	blocks: Block[];
	transactions: TransactionBundle[];
	status: Status;
}

type PageProps = PageErrorProps<Props>;

const HomeBody = (props: Props) => (
	<div>
		<StatusOverview status={props.status} />
		<DivPx size={16} />
		<div className={container.max960}>
			<Feed blocks={props.blocks} transactions={props.transactions} />
		</div>
	</div>
);

const HomePage = (page: PageProps) => (
	<Page
		title={() => PageDefaultHead.title}
		description={() => PageDefaultHead.description}
		page={page}
		Body={HomeBody}
	/>
);

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	const revalidate = BLOCK_INTERVAL_SECONDS;
	try {
		const results = await Promise.all([
			// Feed
			getRecentBlocks({ page: 0 }),
			getRecentTransactions({ page: 0 }),
			// Status
			getStatus(undefined),
		]);
		const props: Props = {
			blocks: results[0].blocks.slice(0, 10),
			transactions: results[1].transactions.slice(0, 10),
			status: results[2],
		};
		return { revalidate, props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { revalidate, props: { hasError: true, error } };
	}
};

export default HomePage;
