import { Link } from "@/components/link/link";
import { Numeric } from "@/components/numeric/numeric";

interface Props {
	value: number;
}

export const BlockHeight = ({ value }: Props) => (
	<Link href={`/block/${value}`}>
		<Numeric type="integer" value={value} />
	</Link>
);
