import React, { FC } from 'react';
import styles from './ChatToggleModal.module.scss';
import Profile from '../../profile/Profile';

const ChatToggleModal: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.top_wrap}>
				<div className={styles.title}>채팅</div>
			</div>

			<div className={styles.item_container}>
				<div className={styles.profile_container}>
					<Profile chat={true}></Profile>
				</div>
			</div>
		</div>
	);
};

export default ChatToggleModal;
