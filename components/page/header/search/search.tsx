import {
	background,
	borderColor,
	Button,
	ButtonGroup,
	Input,
} from "@moai/core";
import { Search as SearchIcon } from "@moai/icon/hrs";
import { useRouter } from "next/router";
import { useState } from "react";
import s from "./search.module.css";
import { getSearchUrl } from "./url";

export const Search = () => {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const input = (
		<Input
			value={query}
			setValue={setQuery}
			placeholder="Search by Address / Hash / Height"
			aria-label="Search by Address / Hash / Height"
		/>
	);
	const button = (
		<Button type="submit" icon={SearchIcon} iconLabel="Submit search" />
	);

	return (
		<form
			className={[s.container].join(" ")}
			onSubmit={(event) => {
				event.preventDefault();
				router.push(getSearchUrl(query));
			}}
		>
			<ButtonGroup
				fill
				children={[
					{ fill: true, element: input },
					{ fill: false, element: button },
				]}
			/>
		</form>
	);
};
