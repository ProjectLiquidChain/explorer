import { Divider } from "@/components/divider/divider";
import { Info } from "@/components/info/info";
import { Numeric } from "@/components/numeric/numeric";
import { Pane } from "@moai/pane/pane";
import { ReceiptCode } from "../code/code";
import { Receipt } from "../receipt";

interface Props {
	receipt: Receipt;
}

export const ReceiptOverview = ({ receipt }: Props) => (
	<Pane>
		<Info
			label="Code"
			children={<ReceiptCode format="long" code={receipt.code} />}
		/>
		<Divider />
		<Info label="Result" children={receipt.result} />
		<Divider />
		<Info
			label="Post state"
			copy={receipt.postState}
			children={receipt.postState}
		/>
		<Divider />
		<Info
			label="Gas used"
			children={<Numeric type="integer" value={receipt.gasUsed} />}
		/>
	</Pane>
);
