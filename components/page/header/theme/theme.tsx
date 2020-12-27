import { Button, ButtonGroup, Tooltip } from "@moai/core";
import { Moon, Sun } from "@moai/icon/hrs";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const applyTheme = (theme: Theme): void => {
	const classes = window.document.documentElement.classList;
	if (classes.contains(theme)) return;
	classes.remove(theme === "light" ? "dark" : "light");
	classes.add(theme);
};

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const theme = window.localStorage.getItem("theme") ?? "light";
		setTheme(theme as Theme);
	}, []);

	useEffect(() => {
		window.localStorage.setItem("theme", theme);
		applyTheme(theme);
	}, [theme]);

	return { theme, setTheme };
};

interface Props {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const Theme = ({ theme, setTheme }: Props): JSX.Element => (
	<ButtonGroup fill>
		<Tooltip content="Use light theme">
			<Button.Forwarded
				style={Button.style.outset}
				icon={Sun}
				iconLabel="Use light theme"
				children="Light"
				onClick={() => setTheme("light")}
				selected={theme === "light"}
				fill
			/>
		</Tooltip>
		<Tooltip content="Use dark theme">
			<Button.Forwarded
				style={Button.style.outset}
				icon={Moon}
				iconLabel="Use dark theme"
				children="Dark"
				onClick={() => setTheme("dark")}
				selected={theme === "dark"}
				fill
			/>
		</Tooltip>
	</ButtonGroup>
);
