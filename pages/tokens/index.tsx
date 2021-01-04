import { container } from "@/components/container/container";
import { Heading } from "@/components/heading/heading";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { toServerError } from "@/components/server/error";
import { getTokens } from "@/components/token/fetch/fetch";
import { TokenTable } from "@/components/token/table/table";
import { Token } from "@/components/token/token";
import { DivPx, Pane } from "@moai/core";
import { BLOCK_INTERVAL_SECONDS } from "constants/constants";
import { GetStaticProps } from "next";

interface Props {
	tokens: Token[];
}

type PageProps = PageErrorProps<Props>;

const TokenIndexBody = (props: Props): JSX.Element => (
	<div className={container.max960}>
		<DivPx size={16} />
		<Heading>Tokens</Heading>
		<Pane noPadding>
			<TokenTable tokens={props.tokens} />
		</Pane>
	</div>
);

const TokenIndexPage = (page: PageProps) => (
	<Page
		title={() => "Tokens | Liquid"}
		description={() => "Tokens on Liquid network"}
		page={page}
		Body={TokenIndexBody}
	/>
);

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	const revalidate = BLOCK_INTERVAL_SECONDS;

	try {
		const tokens = await getTokens(undefined);
		const props: Props = { tokens };
		return { revalidate, props: { hasError: false, ...props } };
	} catch (unknown: unknown) {
		const error = toServerError(unknown);
		return { revalidate, props: { hasError: true, error } };
	}
};

export default TokenIndexPage;
