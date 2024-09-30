import React, { FC } from 'react';
import styles from './ChatDescription.module.scss';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import ChatCreateDate from './chat-create-date/ChatCreateDate';
import ChatJoinMemberCount from './chat-join-member-count/ChatJoinMemberCount';

const ChatDescription: FC<{ chat: ChatListResponse }> = ({ chat }) => {
	return (
		<div className={styles.chat_container}>
			<div className={styles.chat_card_container}>
				<div className={styles.chat_top_container}>
					<div className={styles.chat_username}>
						{chat.recentMessage.memberName}
					</div>
					{/* membercount */}
					{chat.joinMemberCount > 2 && (
						<ChatJoinMemberCount joinMemberCount={chat.joinMemberCount} />
					)}

					<ChatCreateDate createdAt={chat.recentMessage.createdAt} />
				</div>
				<div className={styles.chat_message}>{chat.recentMessage.message}</div>
			</div>
		</div>
	);
};

export default ChatDescription;
