import Meta from '@/utils/meta/Meta';
import { IMeta } from '@/utils/meta/meta.interface';
import { FC, PropsWithChildren } from 'react';
import styles from './Format.module.scss';

const Format: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	return (
		<>
			<Meta {...meta} />
			<main className={styles.main}>
				{/* <div className={styles.modal_mask}>
					<div className="w-96 h-96 bg-white border border-solid border-customDark">
						<div>modal_title</div>
					</div>
				</div> */}
				{children}
			</main>
		</>
	);
};

export default Format;
