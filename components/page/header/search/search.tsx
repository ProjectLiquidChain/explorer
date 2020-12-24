import { background, borderColor, Button, Input } from "@moai/core";
import { Search as SearchIcon } from "@moai/icon/hrs";
import { useRouter } from "next/router";
import { useState } from "react";
import s from "./search.module.css";
import { getSearchUrl } from "./url";

export const Search = () => {
	const [query, setQuery] = useState("");
	const router = useRouter();
	return (
		<form
			className={[s.container, background.secondary, borderColor.weak].join(
				" "
			)}
			onSubmit={(event) => {
				event.preventDefault();
				router.push(getSearchUrl(query));
			}}
		>
			<Input
				style={Input.style.flat}
				value={query}
				setValue={setQuery}
				placeholder="Search by Address / Hash / Height"
				aria-label="Search by Address / Hash / Height"
			/>
			<Button
				style={Button.style.flat}
				type="submit"
				icon={SearchIcon}
				iconLabel="Submit search"
			/>
		</form>
	);
};
