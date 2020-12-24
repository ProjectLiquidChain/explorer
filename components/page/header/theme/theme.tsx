import { Button, ButtonGroup, Tooltip } from "@moai/core";
import { Moon, Sun } from "@moai/icon/hrs";
import { useEffect, useState } from "react";

const applyTheme = (theme: "light" | "dark"): void => {
	const classes = window.document.documentElement.classList;
	if (classes.contains(theme)) return;
	classes.remove(theme === "light" ? "dark" : "light");
	classes.add(theme);
};

export const Theme = () => {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const stored = window.localStorage.getItem("theme") ?? "light";
		setDark(stored === "dark");
	}, []);

	useEffect(() => {
		window.localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	useEffect(() => {
		applyTheme(dark ? "dark" : "light");
	}, [dark]);

	return (
		<ButtonGroup>
			<Tooltip content="Use light theme">
				<Button.Forwarded
					style={Button.style.outset}
					icon={Sun}
					iconLabel="Use light theme"
					onClick={() => setDark(false)}
					selected={!dark}
				/>
			</Tooltip>
			<Tooltip content="Use dark theme">
				<Button.Forwarded
					style={Button.style.outset}
					icon={Moon}
					iconLabel="Use dark theme"
					onClick={() => setDark(true)}
					selected={dark}
				/>
			</Tooltip>
		</ButtonGroup>
	);
};
