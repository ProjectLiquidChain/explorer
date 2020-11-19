import { background } from "@moai/core";
import { PageError, PageErrorProps } from "./error/error";
import { Search } from "./search/search";
import s from "./page.module.css";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
}

export const Page = <T,>(props: Props<T>) => (
	<div className={[s.container, background.secondary].join(" ")}>
		<Search />
		{props.page.hasError ? (
			<PageError message={props.page.error} />
		) : (
			<props.Body {...props.page} />
		)}
	</div>
);
