import { Button, ButtonGroup, Tooltip } from "@moai/core";
import { Moon, Sun } from "@moai/icon/hrs";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const applyTheme = (theme: Theme): void => {
	const classes = window.document.documentElement.classList;
	console.log(classes.contains(theme));
	if (classes.contains(theme)) return;
	classes.remove(theme === "light" ? "dark" : "light");
	classes.add(theme);
};

export const getTheme = (): Theme => {
	// Server side
	if (window === undefined) return "light";
	// Client
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;
	return "light";
};

export const useTheme = () => {
	const [theme, setTheme] = useState(() => getTheme());

	useEffect(() => {
		window.localStorage.setItem("theme", theme);
		applyTheme(theme);
	}, [theme]);

	return { theme, setTheme };
};

interface Props {
	fill: boolean;
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const Theme = ({ fill, theme, setTheme }: Props): JSX.Element => (
	<ButtonGroup fill={fill}>
		<Tooltip content="Use light theme">
			<Button.Forwarded
				style={Button.style.outset}
				icon={Sun}
				iconLabel="Use light theme"
				children={fill ? "Light" : undefined}
				onClick={() => setTheme("light")}
				selected={theme === "light"}
				fill={fill}
			/>
		</Tooltip>
		<Tooltip content="Use dark theme">
			<Button.Forwarded
				style={Button.style.outset}
				icon={Moon}
				iconLabel="Use dark theme"
				children={fill ? "Dark" : undefined}
				onClick={() => setTheme("dark")}
				selected={theme === "dark"}
				fill={fill}
			/>
		</Tooltip>
	</ButtonGroup>
);
