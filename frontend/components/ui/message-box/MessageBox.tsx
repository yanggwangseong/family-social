import React, { FC } from 'react';
import styles from './MessageBox.module.scss';
import Profile from '../profile/Profile';
import cn from 'classnames';

const MessageBox: FC<{ isMine: boolean }> = ({ isMine }) => {
	return (
		<div
			className={cn(styles.message_card_container, {
				[styles.mine_message_card_container]: !!isMine,
			})}
		>
			{!isMine && <Profile />}

			<div className={styles.description_container}>
				<div className={styles.description_wrapper}>
					<div className={styles.description}>
						hifffff4987hifffff4987hifffff4987 hifffff4987 hifffff4987
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageBox;
