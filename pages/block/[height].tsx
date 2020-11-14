import { Block, getBlockByHeight } from "@/models/block";
import { GetServerSideProps } from "next";

interface Props {
	block: Block;
}

const BlockPage = (props: Props) => {
	return (
		<div style={{ whiteSpace: "pre" }}>
			{JSON.stringify(props.block, undefined, 2)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const { height: heightStr } = context.query;
	if (typeof heightStr !== "string") throw Error("Height is not defined");
	const heightNum: number = parseInt(heightStr);
	if (isNaN(heightNum)) throw Error(`Height "${heightStr}" is not a number`);
	const block = await getBlockByHeight(heightNum);
	return { props: { block } };
};

export default BlockPage;
