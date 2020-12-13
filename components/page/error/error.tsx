import { container } from "@/components/container/container";
import { ServerError } from "@/components/server/error";
import { Button, DivPx, text } from "@moai/core";
import Link from "next/link";
import s from "./error.module.css";

interface Props {
	error: ServerError;
}

export type PageErrorProps<P> =
	| {
			hasError: true;
			error: ServerError;
	  }
	| ({
			hasError: false;
	  } & P);

export const PageError = ({ error }: Props) => (
	<div className={[s.container, container.max960].join(" ")}>
		<h1 className={[s.title, text.strong].join(" ")} children={error.title} />
		<DivPx size={8} />
		<p className={[s.message, text.p].join(" ")} children={error.message} />
		<DivPx size={16} />
		<div className={s.buttons}>
			<Link href="/">
				<Button.Forwarded highlight>Go to Home</Button.Forwarded>
			</Link>
			<DivPx size={8} />
			<Button onClick={() => window.location.reload()}>Try again</Button>
		</div>
	</div>
);
