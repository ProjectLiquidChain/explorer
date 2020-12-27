import { Page, PageDefaultHead } from "@/components/page/page";

export const Custom404 = () => (
	<Page
		title={() => PageDefaultHead.title}
		description={() => PageDefaultHead.description}
		page={{
			error: { message: "Page not found", title: "404", type: "http" },
			hasError: true,
		}}
		Body={() => <div>ahihi</div>}
	/>
);

export default Custom404;
