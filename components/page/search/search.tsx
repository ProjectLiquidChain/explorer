import { container } from "@/components/container/container";
import { background, borderColor, boxShadow, Button, Input } from "@moai/core";
import { icons } from "@moai/icon";
import { useState } from "react";
import s from "./search.module.css";

interface Props {}

export const Search = (props: Props) => {
	const [query, setQuery] = useState("");
	return (
		<div
			className={[
				s.container,
				background.primary,
				boxShadow.strong,
				borderColor.weak,
			].join(" ")}
		>
			<form
				className={[s.form, container.max960].join(" ")}
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
				<Button
					style={Button.style.flat}
					type="submit"
					icon={icons.search}
					disabled={query.length === 0}
				/>
			</form>
		</div>
	);
};
