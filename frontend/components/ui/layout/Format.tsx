import Head from 'next/head';

type AppLayoutProps = {
	children: React.ReactNode;
	title: string | undefined;
};

const Format = ({ children, title }: AppLayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="yanglog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>{children}</main>
		</>
	);
};

export default Format;
