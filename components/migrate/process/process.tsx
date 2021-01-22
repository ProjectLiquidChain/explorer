import { MigrateProcessData } from "../migrate";

interface Props {
	data: MigrateProcessData;
}

export const MigrateProcess = (props: Props): JSX.Element => (
	<div>{props.data.status}</div>
);
