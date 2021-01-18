const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const config = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	redirects: () => [
		{
			source: "/blocks",
			destination: "/blocks/1",
			permanent: true,
		},
		{
			source: "/transactions",
			destination: "/transactions/1",
			permanent: true,
		},
		{
			source: "/transfers",
			destination: "/transfers/1",
			permanent: true,
		},
	],
};

module.exports = withBundleAnalyzer(config);
