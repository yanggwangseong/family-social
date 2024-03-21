import Head from 'next/head';
import { FC } from 'react';
import { IMeta } from '@/utils/meta/meta.interface';

const Meta: FC<IMeta> = ({ description, title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<meta
					name="viewport"
					content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
				/>
				{description ? (
					<meta
						itemProp="description"
						name="description"
						content={description}
					/>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
		</>
	);
};

export default Meta;
