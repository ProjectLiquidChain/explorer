import { Button, ButtonGroup } from "@moai/core";
import { icons } from "@moai/icon";
import { useEffect, useState } from "react";

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
		const ls = window.document.documentElement.classList;
		if (dark) {
			ls.remove("theme-light");
			ls.add("theme-dark");
		} else {
			ls.remove("theme-dark");
			ls.add("theme-light");
		}
	}, [dark]);

	return (
		<ButtonGroup>
			<Button
				style={Button.style.outset}
				icon={icons.flash}
				onClick={() => setDark(false)}
				selected={!dark}
			/>
			<Button
				style={Button.style.outset}
				icon={icons.moon}
				onClick={() => setDark(true)}
				selected={dark}
			/>
		</ButtonGroup>
	);
};
