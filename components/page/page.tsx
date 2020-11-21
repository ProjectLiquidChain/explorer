import { background, DivPx, ProgressCircle, text } from "@moai/core";
import { useRouter } from "next/dist/client/router";
import { container } from "../container/container";
import { PageError, PageErrorProps } from "./error/error";
import { PageHeader } from "./header/header";
import s from "./page.module.css";

interface Props<T> {
	Body: (props: T) => JSX.Element;
	page: PageErrorProps<T>;
}

const Loading = () => (
	<div className={[s.loading, container.max960].join(" ")}>
		<ProgressCircle value={null} size={16} />
	</div>
);

export const Page = <T,>(props: Props<T>) => {
	const router = useRouter();
	return (
		<div className={[s.container, background.secondary].join(" ")}>
			<PageHeader />
			{router.isFallback ? (
				<Loading />
			) : props.page.hasError ? (
				<PageError message={props.page.error} />
			) : (
				<props.Body {...props.page} />
			)}
			<DivPx size={32} />
		</div>
	);
};
