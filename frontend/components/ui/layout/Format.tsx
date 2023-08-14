import Meta from '@/utils/meta/Meta';
import { IMeta } from '@/utils/meta/meta.interface';
import { FC, PropsWithChildren } from 'react';
import styles from './Format.module.scss';

const Format: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	return (
		<>
			<Meta {...meta} />
			<main className={styles.main}>{children}</main>
		</>
	);
};

export default Format;
