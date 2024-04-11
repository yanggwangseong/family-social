import React, { FC } from 'react';
import styles from './NotificationModal.module.scss';

const NotificationModal: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.top_wrap}>
				<div className={styles.title}>알람</div>
				<div className={styles.top_right_container}>
					<div className={styles.right_text}>전체보기</div>
				</div>
			</div>

			<div className={styles.item_container}>
				<div>items</div>
			</div>
		</div>
	);
};

export default NotificationModal;
