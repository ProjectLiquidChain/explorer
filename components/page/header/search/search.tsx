import { Button, Input } from "@moai/core";
import { icons } from "@moai/icon";
import { useState } from "react";
import s from "./search.module.css";

interface Props {}

export const Search = (props: Props) => {
	const [query, setQuery] = useState("");
	return (
		<form
			className={[s.container].join(" ")}
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<Input
				style={Input.style.outset}
				value={query}
				setValue={setQuery}
				placeholder="Search by Address / Hash / Height"
			/>
			<Button
				style={Button.style.flat}
				type="submit"
				icon={icons.search}
				disabled={query.length === 0}
			/>
		</form>
	);
};
