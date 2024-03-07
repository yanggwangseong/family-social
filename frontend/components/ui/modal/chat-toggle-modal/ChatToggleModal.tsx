import React, { FC } from 'react';
import styles from './ChatToggleModal.module.scss';
import Profile from '../../profile/Profile';
import { useQuery } from 'react-query';
import { ChatService } from '@/services/chat/chat.service';
import { useRecoilState } from 'recoil';
import { PiNotePencilDuotone } from 'react-icons/pi';
import {
	MessageModalAtomType,
	MessageModalDefaultValue,
	messageModalAtom,
} from '@/atoms/messageModalAtom';
import { createMessageModalAtom } from '@/atoms/createMessageModalAtom';

const ChatToggleModal: FC = () => {
	const [layer, setLayer] =
		useRecoilState<MessageModalAtomType>(messageModalAtom);

	const [createLayer, setCreateLayer] = useRecoilState<boolean>(
		createMessageModalAtom,
	);

	const { data, isLoading } = useQuery(
		['get-chat-list'],
		async () => await ChatService.getChatList(),
	);

	const handleMessageModal = (chatId: string) => {
		setLayer({
			...MessageModalDefaultValue,
			chatId,
			isMessageModal: true,
		});
	};

	const handleCreateMessageModal = () => {
		setCreateLayer(true);
	};

	if (isLoading) return <div>Loading</div>;
	if (!data) return null;

	return (
		<div className={styles.container}>
			<div className={styles.top_wrap}>
				<div className={styles.title}>채팅</div>
				<div
					className={styles.create_chat_icon_container}
					onClick={handleCreateMessageModal}
				>
					<PiNotePencilDuotone size={24} />
				</div>
			</div>

			<div className={styles.item_container}>
				{data.list.map((item, index) => (
					<div
						key={index}
						className={styles.profile_container}
						onClick={() => handleMessageModal(item.chatId)}
					>
						<Profile chat={item}></Profile>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatToggleModal;
