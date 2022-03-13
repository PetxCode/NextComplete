import { SessionProvider } from "next-auth/react";
import Headers from "../components/Headers";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider>
			<Headers />
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp
