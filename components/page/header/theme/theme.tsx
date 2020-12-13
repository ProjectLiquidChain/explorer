import { Button, ButtonGroup, Tooltip } from "@moai/core";
import { icons } from "@moai/icon";
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
					icon={icons.flash}
					iconLabel="Use light theme"
					onClick={() => setDark(false)}
					selected={!dark}
				/>
			</Tooltip>
			<Tooltip content="Use dark theme">
				<Button.Forwarded
					style={Button.style.outset}
					icon={icons.moon}
					iconLabel="Use dark theme"
					onClick={() => setDark(true)}
					selected={dark}
				/>
			</Tooltip>
		</ButtonGroup>
	);
};
