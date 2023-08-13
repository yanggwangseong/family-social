import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = React.useRef(new QueryClient());

	return (
		<QueryClientProvider client={queryClient.current}>
			<Hydrate state={pageProps.dehydratedState}>
				<RecoilRoot>
					<Component {...pageProps} />
					{process.env.NODE_ENV === 'development' && (
						<ReactQueryDevtools initialIsOpen={false} />
					)}
				</RecoilRoot>
			</Hydrate>
		</QueryClientProvider>
	);
}
