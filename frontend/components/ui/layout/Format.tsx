import Meta from '@/utils/meta/Meta';
import { IMeta } from '@/utils/meta/meta.interface';
import { FC, PropsWithChildren } from 'react';
import styles from './Format.module.scss';
import LayerModal from '@/ui/modal/layer-modal/LayerModal';

const Format: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	const layerModalMode: 'emailInvitation' | 'linkInvation' = 'emailInvitation';
	return (
		<>
			<Meta {...meta} />
			<main className={styles.main}>
				<LayerModal />
				{children}
			</main>
		</>
	);
};

export default Format;
