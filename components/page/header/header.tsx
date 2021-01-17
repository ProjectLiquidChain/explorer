import { container } from "@/components/container/container";
import { background, Border, Button, DivPx, shadow } from "@moai/core";
import { Menu } from "@moai/icon/hrs";
import { useState } from "react";
import s from "./header.module.css";
import { Logo } from "./logo/logo";
import { Navigation } from "./navigation/navigation";
import { Search } from "./search/search";
import { Theme, useTheme } from "./theme/theme";

export const PageHeader = () => {
	const [showMenu, setShowMenu] = useState(false);
	const { theme, setTheme } = useTheme();
	return (
		<div className={[s.wrapper, shadow.boxStrong, background.strong].join(" ")}>
			<div className={[s.container, container.max960].join(" ")}>
				<div className={s.logo}>
					<Logo />
				</div>
				<div className={s.navigation}>
					<Navigation />
				</div>
				<div className={s.toggle}>
					<Button
						onClick={() => setShowMenu((b) => !b)}
						selected={showMenu}
						icon={Menu}
						iconLabel="Menu"
					/>
				</div>
				<div className={s.search}>
					<Search />
				</div>
				<div className={s.theme}>
					<Theme theme={theme} setTheme={setTheme} />
				</div>
				<div className={s.menu}>
					{showMenu && (
						<>
							<div className={s.navigation}>
								<Navigation />
							</div>
							<DivPx size={16} />
							<div className={s.theme}>
								<Theme theme={theme} setTheme={setTheme} />
							</div>
							<DivPx size={16} />
						</>
					)}
					<div className={s.search}>
						<Search />
					</div>
				</div>
			</div>
			<Border color="strong" />
		</div>
	);
};
