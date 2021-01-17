import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import * as React from "react";

interface Props {}

type PageProps = PageErrorProps<Props>;

const MigrateBody = () => <div>Migrate</div>;

const MigratePage = (page: PageProps) => (
	<Page
		title={() => "Migrate | Liquid"}
		description={() => "Migrate QASH to LQT on Liquid network"}
		page={page}
		Body={MigrateBody}
	/>
);

export default MigratePage;
