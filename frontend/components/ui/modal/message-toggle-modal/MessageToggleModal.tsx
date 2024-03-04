import React, { FC, useEffect } from 'react';
import styles from './MessageToggleModal.module.scss';
import Profile from '../../profile/Profile';
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

	const onSubmit: SubmitHandler<{ message: string }> = data => {};

	const { data, isLoading } = useQuery(
		['get-messages-chat'],
		async () => await MessageService.getMessages(layer.chatId),
		{
			enabled: !!layer.chatId,
		},
	);

	useEffect(() => {
		if (layer.chatId) {
			socket.emit('enter-chat', {
				chatIds: [layer.chatId],
			});
		}
	}, [layer.chatId, socket]);

	if (isLoading) return null;
	if (!data) return null;

	return (
		<>
			{layer.isMessageModal && (
				<div className={styles.container}>
					<div className={styles.top_container}>
						<div className={styles.top_wrap}>
							<div>
								<Profile />
							</div>
							<div>양우성</div>
							<div
								className={styles.close_btn}
								onClick={handleCloseMessageModal}
							>
								<IoCloseSharp size={24} />
							</div>
						</div>
					</div>
					<div className={styles.body_container}>
						<div className={styles.message_container}>
							{data.list.map((item, index) => (
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
										placeholder="댓글을 입력 하세요."
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
