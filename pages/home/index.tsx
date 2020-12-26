import { Block } from "@/components/block/block";
import { getRecentBlocks } from "@/components/block/fetch/fetch";
import { container } from "@/components/container/container";
import { Feed } from "@/components/feed/feed";
import { Overview } from "@/components/overview/overview";
import { PageErrorProps } from "@/components/page/error/error";
import { Page, PageDefaultHead } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { getRecentTransactions } from "@/components/transaction/fetch/fetch";
import { CompletedTransaction } from "@/components/transaction/transaction";
import { DivPx } from "@moai/core";
import { GetStaticProps } from "next";
import * as React from "react";

interface Props {
	blocks: Block[];
	transactions: CompletedTransaction[];
}

type PageProps = PageErrorProps<Props>;

const HomeBody = (props: Props) => (
	<div>
		<Overview block={props.blocks[0]} />
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
	const interval = process.env.NEXT_PUBLIC_BLOCK_INTERVAL;
	if (interval === undefined) throw Error("BLOCK_INTERVAL is undefined");
	const revalidate = parseInt(interval);

	try {
		const { blocks } = await getRecentBlocks({ page: 0 });
		let { transactions } = await getRecentTransactions({ page: 0 });
		transactions = transactions.slice(0, 10);
		const props: Props = { blocks, transactions };
		return { revalidate, props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { revalidate, props: { hasError: true, error } };
	}
};

export default HomePage;
