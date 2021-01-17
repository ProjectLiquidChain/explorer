import s from "./logo.module.css";
import Link from "next/link";
import { text } from "@moai/core";

export const Logo = () => (
	<Link href="/">
		<a className={[s.container, text.highlightWeak].join(" ")}>
			<svg
				width="32"
				height="32"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				className={[s.image].join(" ")}
			>
				<title>Liquid logo</title>
				<path d="M3.5 5H0.5C0.223858 5 0 5.22386 0 5.5V15.5C0 15.7761 0.223858 16 0.5 16H10.5C10.7761 16 11 15.7761 11 15.5V12.5C11 12.2239 10.7761 12 10.5 12H4.5C4.22386 12 4 11.7761 4 11.5V5.5C4 5.22386 3.77614 5 3.5 5Z" />
				<path d="M4 0.5C4 0.223858 4.22386 0 4.5 0H15.5C15.7761 0 16 0.223858 16 0.5V11.5C16 11.7761 15.7761 12 15.5 12H12.5C12.2239 12 12 11.7761 12 11.5V8.5C12 8.22386 11.7761 8 11.5 8H8.5C8.22386 8 8 7.77614 8 7.5V4.5C8 4.22386 7.77614 4 7.5 4H4.5C4.22386 4 4 3.77614 4 3.5V0.5Z" />
			</svg>
		</a>
	</Link>
);
