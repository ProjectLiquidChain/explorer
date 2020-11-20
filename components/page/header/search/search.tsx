import { background, borderColor, Button, Input } from "@moai/core";
import { icons } from "@moai/icon";
import { useState } from "react";
import s from "./search.module.css";

export const Search = () => {
	const [query, setQuery] = useState("");
	return (
		<form
			className={[s.container, background.secondary, borderColor.weak].join(
				" "
			)}
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<Input
				style={Input.style.flat}
				value={query}
				setValue={setQuery}
				placeholder="Search by Address / Hash / Height"
			/>
			<Button style={Button.style.flat} type="submit" icon={icons.search} />
		</form>
	);
};
