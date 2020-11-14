import { Contract, getContract } from "@/models/contract";
import { GetServerSideProps } from "next";

interface Props {
	contract: Contract;
}

const ContractPage = (props: Props) => {
	return (
		<div style={{ whiteSpace: "pre" }}>
			{JSON.stringify(props.contract, undefined, 2)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const { address } = context.query;
	if (typeof address !== "string") throw Error("Address is not defined");
	const contract = await getContract(address);
	return { props: { contract } };
};

export default ContractPage;
