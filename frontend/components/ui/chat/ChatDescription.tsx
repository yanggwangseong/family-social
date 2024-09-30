import React, { FC } from 'react';
import styles from './ChatDescription.module.scss';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';

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
					<div className={styles.chat_date}>
						{format(parseISO(chat.recentMessage.createdAt), 'a h:mm', {
							locale: ko,
						})}
					</div>
				</div>
				<div className={styles.chat_message}>{chat.recentMessage.message}</div>
			</div>
		</div>
	);
};

export default ChatDescription;
