import s from "./logo.module.css";
import Link from "next/link";

export const Logo = () => (
	<Link href="/">
		<a>
			<img
				className={s.image}
				width={32}
				height={32}
				alt="Liquid Logo"
				src="/logo.svg"
			/>
		</a>
	</Link>
);
