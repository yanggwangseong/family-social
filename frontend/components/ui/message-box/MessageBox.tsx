import React, { FC } from 'react';
import styles from './MessageBox.module.scss';
import Profile from '../profile/Profile';

const MessageBox: FC = () => {
	return (
		<div className={styles.message_card_container}>
			<Profile />
			<div className={styles.description_container}>
				<div className={styles.description_wrapper}>
					<div className={styles.description}>hi</div>
				</div>
			</div>
		</div>
	);
};

export default MessageBox;
