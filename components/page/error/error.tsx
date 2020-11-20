import { container } from "@/components/container/container";
import { Button, DivPx, Paragraph, Strong } from "@moai/core";
import Link from "next/link";
import s from "./error.module.css";

interface Props {
	message: string;
}

export type PageErrorProps<P> =
	| {
			hasError: true;
			error: string;
	  }
	| ({
			hasError: false;
	  } & P);

export const PageError = (props: Props) => (
	<div className={[s.container, container.max960].join(" ")}>
		<h1 className={s.title}>
			<Strong>There was an error rendering this page</Strong>
		</h1>
		<DivPx size={8} />
		<Paragraph>{props.message}</Paragraph>
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
