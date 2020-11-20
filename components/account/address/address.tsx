import { Link } from "@/components/link/link";

interface Props {
	value: string;
}

export const AccountAddress = ({ value }: Props) => (
	<Link href={`/account/${value}`} children={value} />
);
