import React, { FC } from 'react';
import styles from './ChatToggleModal.module.scss';
import Profile from '../../profile/Profile';
import { useQuery } from 'react-query';
import { ChatService } from '@/services/chat/chat.service';

const ChatToggleModal: FC = () => {
	const { data, isLoading } = useQuery(
		['get-chat-list'],
		async () => await ChatService.getChatList(),
	);

	if (isLoading) return <div>Loading</div>;
	if (!data) return null;

	return (
		<div className={styles.container}>
			<div className={styles.top_wrap}>
				<div className={styles.title}>채팅</div>
			</div>

			<div className={styles.item_container}>
				{data.list.map((item, index) => (
					<div key={index} className={styles.profile_container}>
						<Profile chat={item}></Profile>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatToggleModal;
