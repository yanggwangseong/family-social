import Meta from '@/utils/meta/Meta';
import { IMeta } from '@/utils/meta/meta.interface';
import { FC, PropsWithChildren } from 'react';

const Format: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	return (
		<>
			<Meta {...meta} />
			<main>{children}</main>
		</>
	);
};

export default Format;
