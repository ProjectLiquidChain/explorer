import { container } from "@/components/container/container";
import { Heading } from "@/components/heading/heading";
import { Migrate } from "@/components/migrate/migrate";
import { PageErrorProps } from "@/components/page/error/error";
import { Page } from "@/components/page/page";
import { Pane } from "@moai/core";
import * as React from "react";

interface Props {}

type PageProps = PageErrorProps<Props>;

const MigrateBody = () => (
	<div className={container.max960}>
		<Heading>Migrate QASH</Heading>
		<Pane noPadding children={<Migrate />} />
	</div>
);

const MigratePage = (page: PageProps) => (
	<Page
		title={() => "Migrate | Liquid"}
		description={() => "Migrate QASH to LQT on Liquid network"}
		page={page}
		Body={MigrateBody}
	/>
);

export default MigratePage;
