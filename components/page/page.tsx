import { background, DivPx } from "@moai/core";
import NextHead from "next/head";
import { PageError, PageErrorProps } from "./error/error";
import { PageHeader } from "./header/header";
import s from "./page.module.css";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
	title: (props: T) => string;
	description: (props: T) => string;
}

// const Loading = () => (
// 	<div className={[s.loading, container.max960].join(" ")}>
// 		<ProgressCircle value={null} size={16} />
// 	</div>
// );

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
			{page.hasError ? <PageError message={page.error} /> : <Body {...page} />}
			<DivPx size={32} />
		</div>
	);
};
