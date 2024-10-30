import React, { FC } from 'react';
import styles from './MessageBox.module.scss';
import Profile from '../profile/Profile';
import cn from 'classnames';
import { MessageBoxProps } from './message-box.interface';
import ChatCreateDate from '../chat/chat-create-date/ChatCreateDate';

const MessageBox: FC<MessageBoxProps> = ({ isMine, message }) => {
	return (
		<div
			className={cn(styles.message_card_container, {
				[styles.mine_message_card_container]: !!isMine,
			})}
		>
			{!isMine && <Profile searchMember={message.member} />}

			<div className={styles.description_container}>
				<div className={styles.description_wrapper}>
					<div className={styles.description}>{message.message}</div>
				</div>
			</div>
			<ChatCreateDate createdAt={message.createdAt} />
		</div>
	);
};

export default MessageBox;
