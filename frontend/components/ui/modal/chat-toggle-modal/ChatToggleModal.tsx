import React, { FC } from 'react';
import styles from './ChatToggleModal.module.scss';
import Profile from '../../profile/Profile';
import { useQuery } from 'react-query';
import { ChatService } from '@/services/chat/chat.service';
import { useRecoilState } from 'recoil';
import {
	PiChatCenteredDotsDuotone,
	PiNotePencilDuotone,
	PiUsersThreeDuotone,
} from 'react-icons/pi';
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
import NotFoundSearch from '../../not-found/search/NotFoundSearch';
import { NOT_FOUND_CHAT } from '@/constants/index';
import GroupAndMemberProfile from '../../profile/group-and-member-profile/GroupAndMemberProfile';

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
				{!data ? (
					<NotFoundSearch message={NOT_FOUND_CHAT} />
				) : (
					<>
						<div className={styles.chat_container}>
							<div className={styles.chat_icon_container}>
								<PiChatCenteredDotsDuotone size={22} />
							</div>
							<div className={styles.chat_text}>개인 채팅</div>
						</div>

						{data.list
							.filter(item => item.recentMessage && item.chatType === 'DIRECT')
							.map((item, index) => (
								<div
									key={index}
									className={styles.profile_container}
									onClick={() => handleMessageModal(item.chatId)}
								>
									<Profile chat={item}></Profile>
								</div>
							))}
						<div className={styles.chat_container}>
							<div className={styles.chat_icon_container}>
								<PiUsersThreeDuotone size={22} />
							</div>
							<div className={styles.chat_text}>그룹 채팅</div>
						</div>

						{data.list
							.filter(item => item.recentMessage && item.chatType === 'GROUP')
							.map(
								(item, index) =>
									item.group && (
										<div
											key={index}
											className={styles.profile_container}
											onClick={() => handleMessageModal(item.chatId)}
										>
											<GroupAndMemberProfile
												group={item.group}
												member={{
													username: item.recentMessage.memberName,
													email: item.recentMessage.memberEmail,
													profileImage: item.recentMessage.memberProfileImage,
													id: item.recentMessage.memberId,
												}}
												chat={item}
											/>
										</div>
									),
							)}
					</>
				)}
			</motion.div>
		</motion.div>
	);
};

export default ChatToggleModal;
