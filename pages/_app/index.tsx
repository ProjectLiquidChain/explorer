import "@moai/core";
import { AppProps } from "next/app";
import "./_app.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
