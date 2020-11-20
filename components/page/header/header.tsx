import { container } from "@/components/container/container";
import { Pane } from "@/components/pane/pane";
import { background, DivPx } from "@moai/core";
import s from "./header.module.css";
import { Logo } from "./logo/logo";
import { Search } from "./search/search";
import { Theme } from "./theme/theme";

export const PageHeader = () => (
	<Pane>
		<div className={[s.body, container.max960].join(" ")}>
			<div className={s.logo}>
				<Logo />
			</div>
			<DivPx size={16} />
			<div className={[s.search].join(" ")}>
				<Search />
			</div>
			<DivPx size={16} />
			<div className={s.theme}>
				<Theme />
			</div>
		</div>
	</Pane>
);
