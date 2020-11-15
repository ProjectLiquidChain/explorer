import { AppProps } from "next/app";
import "../styles/globals.css";
import { scrollbar } from "@moai/core";

console.log(scrollbar.custom);

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
