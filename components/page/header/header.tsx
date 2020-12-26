import { container } from "@/components/container/container";
import { background, Border, boxShadow, Button, DivPx } from "@moai/core";
import { Menu } from "@moai/icon/hrs";
import { useRouter } from "next/router";
import { useState } from "react";
import s from "./header.module.css";
import { Logo } from "./logo/logo";
import { Navigation } from "./navigation/navigation";
import { Search } from "./search/search";
import { Theme, useTheme } from "./theme/theme";

export const PageHeader = () => {
	const router = useRouter();
	const [showMenu, setShowMenu] = useState(false);
	const { theme, setTheme } = useTheme();
	return (
		<div
			className={[s.container, boxShadow.strong, background.primary].join(" ")}
		>
			<div className={[s.toolbar, container.max960].join(" ")}>
				<div className={s.left}>
					<div className={s.logo}>
						<Logo />
					</div>
					<div className={s.navigation}>
						<Navigation fill={true} />
					</div>
					<div className={s.toggle}>
						<Button
							onClick={() => setShowMenu((b) => !b)}
							selected={showMenu}
							icon={Menu}
							iconLabel="Menu"
						/>
					</div>
				</div>
				{showMenu && (
					<div className={s.menu}>
						<div className={s.navigation}>
							<Navigation fill={false} />
						</div>
						<div className={s.theme}>
							<Theme theme={theme} setTheme={setTheme} fill={true} />
						</div>
					</div>
				)}
				<div className={s.search}>
					<Search />
				</div>
				<div className={s.theme}>
					<Theme theme={theme} setTheme={setTheme} fill={true} />
				</div>
			</div>
			{router.pathname !== "/" && <Border color="strong" />}
		</div>
	);
};
