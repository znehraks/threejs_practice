/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AnimatePresence>
			<Component {...pageProps} />;
		</AnimatePresence>
	);
}
