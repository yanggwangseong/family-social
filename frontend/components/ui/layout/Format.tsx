import Meta from '@/utils/meta/Meta';
import { IMeta } from '@/utils/meta/meta.interface';
import { FC, PropsWithChildren } from 'react';
import styles from './Format.module.scss';
import LayerModal from '@/ui/modal/layer-modal/LayerModal';
import MediaLayer from '../modal/layer-modal/layer/MediaLayer/MediaLayer';
import MessageToggleModal from '../modal/message-toggle-modal/MessageToggleModal';

const Format: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	return (
		<>
			<Meta {...meta} />
			<main className={styles.main}>
				<LayerModal />
				<MediaLayer />
				<MessageToggleModal />
				{children}
			</main>
		</>
	);
};

export default Format;
