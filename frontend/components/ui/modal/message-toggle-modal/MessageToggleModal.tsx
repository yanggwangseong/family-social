import React, { FC, useEffect, useRef } from 'react';
import styles from './MessageToggleModal.module.scss';
import { IoCloseSharp, IoSend } from 'react-icons/io5';
import { FaRegSmile } from 'react-icons/fa';
import { useEmoji } from '@/hooks/useEmoji';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FieldWithTextarea from '../../field/field-area/FieldArea';
import CustomButton from '../../button/custom-button/CustomButton';
import MessageBox from '../../message-box/MessageBox';
import { useRecoilState } from 'recoil';
import {
	MessageModalAtomType,
	MessageModalDefaultValue,
	messageModalAtom,
} from '@/atoms/messageModalAtom';
import { useQuery } from 'react-query';
import { MessageService } from '@/services/message/message.service';
import { useSocket } from '@/hooks/useSocket';
import { ChatService } from '@/services/chat/chat.service';
import MessageGroupProfile from '../../profile/message-group-profile/MessageGroupProfile';
import DirectChatMembers from '../../chat/direct-chat-members/DirectChatMembers';
import { DEFAULT_CHAT_TYPE } from '@/constants/index';

const MessageToggleModal: FC = () => {
	const [layer, setLayer] =
		useRecoilState<MessageModalAtomType>(messageModalAtom);

	const { socket, isConnected } = useSocket();

	const {
		register,
		formState: { errors, isValid, isDirty },
		setValue,
		handleSubmit,
		reset,
		getValues,
		watch,
		getFieldState,
	} = useForm<{ message: string }>({
		mode: 'onChange',
	});

	const { isEmoji, handleEmojiView, handlesetValueAddEmoji } = useEmoji<{
		message: string;
	}>(getValues, setValue);

	const handleAddEmojiValue = (emojiData: EmojiClickData) => {
		handlesetValueAddEmoji(emojiData, 'message');
	};

	const handleCloseMessageModal = () => {
		setLayer(MessageModalDefaultValue);
	};

	const onSubmit: SubmitHandler<{ message: string }> = async data => {
		if (layer.isNewMessage) {
			/**
			 * 새로운 채팅방 생성시
			 * 이미 존재하는 채팅방이라면 chatId를 반환 받는다.
			 * 여기서는 무조건 다이렉트 채팅 생성
			 */
			const chat = await ChatService.postChat(
				[
					'410b7202-660a-4423-a6c3-6377857241cc',
					'83491506-9047-4cfc-9dec-9f1e2016ae13',
				],
				DEFAULT_CHAT_TYPE,
			);

			setLayer({
				isMessageModal: true,
				isNewMessage: false,
				chatId: chat.id,
			});

			socket.emit('send-message', {
				message: data.message,
				chatId: chat.id,
			});
		} else {
			socket.emit('send-message', {
				message: data.message,
				chatId: layer.chatId,
			});
			refetch();
		}

		reset();
	};

	const { data, isLoading, refetch } = useQuery(
		['get-messages-chat', layer.chatId],
		async () => await MessageService.getMessages(layer.chatId),
		{
			enabled: !!layer.chatId,
		},
	);

	const { data: chatData } = useQuery(
		['get-chat', layer.chatId],
		async () => await ChatService.getChat(layer.chatId),
		{
			enabled: !!layer.chatId,
		},
	);

	useEffect(() => {
		if (isConnected && layer.chatId) {
			socket.emit('enter-chat', {
				chatIds: [layer.chatId],
			});
		}
	}, [isConnected, layer.chatId, socket]);

	const messageContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop =
				messageContainerRef.current.scrollHeight;
		}
	}, [data, layer.isMessageModal]);

	if (isLoading) return null;

	return (
		<>
			{layer.isMessageModal && (
				<div className={styles.container}>
					<div className={styles.top_container}>
						<div className={styles.top_wrap}>
							{chatData && chatData.chatType === 'GROUP' && chatData.group ? (
								<MessageGroupProfile
									chatGroup={chatData.group}
									joinMemberCount={chatData.joinMemberCount}
								/>
							) : (
								<>
									<DirectChatMembers chat={chatData} />
									{chatData?.chatMembers
										.slice(0, 4)
										.map(member => member.member.username)
										.join(', ')}
									{chatData && chatData.chatMembers.length > 4 && '...'}
								</>
							)}
							<div
								className={styles.close_btn}
								onClick={handleCloseMessageModal}
							>
								<IoCloseSharp size={24} />
							</div>
						</div>
					</div>
					<div className={styles.body_container}>
						<div ref={messageContainerRef} className={styles.message_container}>
							{data?.list.map((item, index) => (
								<MessageBox
									key={index}
									isMine={item.isMine}
									message={item}
								></MessageBox>
							))}
						</div>

						<div className={styles.bottom_container}>
							<form
								className={styles.bottom_form}
								onSubmit={handleSubmit(onSubmit)}
							>
								<div className={styles.comment_form_container}>
									<div className={styles.comment_emoji_container}>
										<FaRegSmile
											className={'cursor-pointer'}
											size={22}
											onClick={handleEmojiView}
										/>
										{isEmoji && (
											<div className={styles.emoji_view_container}>
												<EmojiPicker
													height={400}
													autoFocusSearch={false}
													searchDisabled={true}
													skinTonesDisabled={true}
													onEmojiClick={handleAddEmojiValue}
												/>
											</div>
										)}
									</div>
									<FieldWithTextarea
										{...register('message', {
											maxLength: {
												value: 2000,
												message: '최대 2000자까지 가능합니다',
											},
										})}
										fieldClass="hidden_border_textarea"
										placeholder="메세지를 입력 하세요."
									></FieldWithTextarea>
									<div className={styles.comment_btn_container}>
										<CustomButton
											type="submit"
											className="text-customOrange font-extrabold bg-basic text-sm"
											shadowNone={true}
										>
											<IoSend />
										</CustomButton>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MessageToggleModal;
