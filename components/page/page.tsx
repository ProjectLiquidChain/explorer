import { Background, Border } from "@moai/core";
import { PageError, PageErrorProps } from "./error/error";
import { Search } from "./search/search";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
}

export const Page = <T,>(props: Props<T>) => (
	<Background color="secondary">
		<Search />
		<Border color="weak" />
		{props.page.hasError ? (
			<PageError message={props.page.error} />
		) : (
			<props.Body {...props.page} />
		)}
	</Background>
);
