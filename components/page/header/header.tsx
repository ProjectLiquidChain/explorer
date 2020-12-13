import { container } from "@/components/container/container";
import { background, Border, borderColor, boxShadow, DivPx } from "@moai/core";
import s from "./header.module.css";
import { Logo } from "./logo/logo";
import { Search } from "./search/search";
import { Theme } from "./theme/theme";

export const PageHeader = () => (
	<div
		className={[s.container, boxShadow.strong, background.primary].join(" ")}
	>
		<div className={[s.body, container.max960].join(" ")}>
			<div className={s.logo} children={<Logo />} />
			<div className={s.search} children={<Search />} />
			<DivPx size={16} />
			<div className={s.theme} children={<Theme />} />
		</div>
		<Border color="strong" />
	</div>
);
