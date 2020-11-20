import { background, borderColor, boxShadow, DivPx } from "@moai/core";
import { container } from "../container/container";
import { PageError, PageErrorProps } from "./error/error";
import { Logo } from "./logo/logo";
import s from "./page.module.css";
import { Search } from "./search/search";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
}

export const Page = <T,>(props: Props<T>) => (
	<div className={[s.container, background.secondary].join(" ")}>
		<div
			className={[
				s.header,
				background.primary,
				boxShadow.strong,
				borderColor.weak,
			].join(" ")}
		>
			<div className={[s.headerBody, container.max960].join(" ")}>
				<div className={s.logo}>
					<Logo />
				</div>
				<DivPx size={16} />
				<div className={[s.search, background.secondary].join(" ")}>
					<Search />
				</div>
			</div>
		</div>
		{props.page.hasError ? (
			<PageError message={props.page.error} />
		) : (
			<props.Body {...props.page} />
		)}
	</div>
);
