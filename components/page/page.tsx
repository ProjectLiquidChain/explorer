import { background, DivPx } from "@moai/core";
import { PageError, PageErrorProps } from "./error/error";
import { PageHeader } from "./header/header";
import s from "./page.module.css";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
}

export const Page = <T,>(props: Props<T>) => (
	<div className={[s.container, background.secondary].join(" ")}>
		<PageHeader />
		{props.page.hasError ? (
			<PageError message={props.page.error} />
		) : (
			<props.Body {...props.page} />
		)}
		<DivPx size={32} />
	</div>
);
