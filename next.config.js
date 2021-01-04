module.exports = {
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
	],
};
