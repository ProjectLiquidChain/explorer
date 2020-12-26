import { alert, Button, ButtonGroup, Input } from "@moai/core";
import { useState } from "react";
import s from "./input.module.css";

interface Props {
	page: number;
	onPageChange: (page: number) => void;
}

export const PaginationInput = (props: Props): JSX.Element => {
	const [page, setPage] = useState(props.page.toString());

	const input = <Input autoFocus value={page} setValue={setPage} />;
	const button = <Button type="submit" children="Go" />;

	const onSubmit = (): void => {
		const value = parseInt(page);
		if (Number.isNaN(value)) {
			alert("Please enter a valid number");
			return;
		} else {
			props.onPageChange(value);
		}
	};

	return (
		<form className={s.container} onSubmit={onSubmit}>
			<ButtonGroup
				children={[
					{ fill: true, element: input },
					{ fill: false, element: button },
				]}
			/>
		</form>
	);
};
