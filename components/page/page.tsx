import { Background, Border } from "@moai/core";
import { Search } from "./search/search";

interface Props {
	children: React.ReactNode;
}

export const Page = (props: Props) => (
	<Background color="secondary">
		<Search />
		<Border color="weak" />
		{props.children}
	</Background>
);
