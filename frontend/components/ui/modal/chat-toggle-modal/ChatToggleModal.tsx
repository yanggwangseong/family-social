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
import { motion } from 'framer-motion';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';

const ChatToggleModal: FC<{ isOpenMessage: boolean }> = ({ isOpenMessage }) => {
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
		<motion.div
			className={styles.container}
			variants={toggleWrapperVariant}
			style={{ pointerEvents: isOpenMessage ? 'auto' : 'none' }}
		>
			<motion.div className={styles.top_wrap} variants={toggleVariant}>
				<div className={styles.title}>채팅</div>
				<div
					className={styles.create_chat_icon_container}
					onClick={handleCreateMessageModal}
				>
					<PiNotePencilDuotone size={24} />
				</div>
			</motion.div>

			<motion.div className={styles.item_container} variants={toggleVariant}>
				{data.list.map((item, index) => (
					<div
						key={index}
						className={styles.profile_container}
						onClick={() => handleMessageModal(item.chatId)}
					>
						<Profile chat={item}></Profile>
					</div>
				))}
			</motion.div>
		</motion.div>
	);
};

export default ChatToggleModal;
