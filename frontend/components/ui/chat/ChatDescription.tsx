import React, { FC } from 'react';
import styles from './ChatDescription.module.scss';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import ChatCreateDate from './chat-create-date/ChatCreateDate';

const ChatDescription: FC<{ chat: ChatListResponse }> = ({ chat }) => {
	return (
		<div className={styles.chat_container}>
			<div className={styles.chat_card_container}>
				<div className={styles.chat_top_container}>
					<div className={styles.chat_username}>
						{chat.recentMessage.memberName}
					</div>
					<div className={styles.chat_join_member_count}>
						{chat.joinMemberCount > 2 && chat.joinMemberCount}
					</div>
					<ChatCreateDate createdAt={chat.recentMessage.createdAt} />
				</div>
				<div className={styles.chat_message}>{chat.recentMessage.message}</div>
			</div>
		</div>
	);
};

export default ChatDescription;
