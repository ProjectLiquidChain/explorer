import s from "./hash.module.css";

interface Props {
	value: string;
}

export const Hash = ({ value }: Props): JSX.Element => (
	<span className={s.container}>{value}</span>
);
