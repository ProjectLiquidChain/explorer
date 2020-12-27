import { background, DivPx } from "@moai/core";
import NextHead from "next/head";
import { PageError, PageErrorProps } from "./error/error";
import { PageFooter } from "./footer/footer";
import { PageHeader } from "./header/header";
import s from "./page.module.css";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
	title: (props: T) => string;
	description: (props: T) => string;
}

const defaults = {
	title: "Liquid Blockchain Explorer",
	description:
		"Explore and search the Liquid blockchain for blocks, transactions, addresses, and other activities",
};

export const PageDefaultHead = defaults;

const Head = <T,>({ page, title, description }: Props<T>): JSX.Element => (
	<NextHead>
		<title>{page.hasError ? defaults.title : title(page)}</title>
		<meta
			name="description"
			content={page.hasError ? defaults.description : description(page)}
		/>
	</NextHead>
);

export const Page = <T,>(props: Props<T>) => {
	const { page, Body } = props;
	return (
		<div className={[s.container, background.secondary].join(" ")}>
			<Head {...props} />
			<PageHeader />
			<div className={s.body}>
				{page.hasError ? <PageError error={page.error} /> : <Body {...page} />}
			</div>
			<DivPx size={32} />
			<PageFooter />
		</div>
	);
};
