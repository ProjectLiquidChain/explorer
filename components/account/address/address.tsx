import { Link } from "@/components/link/link";
import { Account } from "../account";

interface Props {
	value: Account["address"];
}

export const AccountAddress = ({ value }: Props) => (
	<Link href={`/account/${value}`} children={value} />
);
