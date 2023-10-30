import React, { FC, useEffect, useState } from 'react';
import { CommentsProps, CreateCommentRequest } from './comments-interface';
import styles from './Comments.module.scss';
import CommentItem from './comment-item/CommentItem';
import Profile from '../../profile/Profile';
import FieldWithTextarea from '../../field/field-area/FieldArea';
import { FaRegSmile } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import CustomButton from '../../button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { CommentService } from '@/services/comment/comment.service';
import { useEmoji } from '@/hooks/useEmoji';

const Comments: FC<CommentsProps> = ({
	comments,
	feedId,
	isToggleCommentWrite,
	onCommentRefetch,
}) => {
	const {
		register,
		formState: { errors, isValid, isDirty },
		setValue,
		handleSubmit,
		reset,
		getValues,
		watch,
		getFieldState,
	} = useForm<{ commentContents: string }>({
		mode: 'onChange',
	});

	const { isEmoji, handleEmojiView, handlesetValueAddEmoji } = useEmoji<{
		commentContents: string;
	}>(getValues, setValue);

	const { mutate: createGroupSync } = useMutation(
		['create-comment'],
		(data: CreateCommentRequest) => CommentService.createComment(data),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `피드를 생성 하였습니다.`, '확인');
				reset({ commentContents: '' });
				onCommentRefetch();
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const handleAddEmojiValue = (emojiData: EmojiClickData) => {
		handlesetValueAddEmoji(emojiData, 'commentContents');
	};

	const onSubmit: SubmitHandler<{ commentContents: string }> = data => {
		createGroupSync({
			commentContents: data.commentContents,
			feedId: feedId,
		});
	};

	return (
		<div className={styles.comment_container}>
			{isToggleCommentWrite && (
				<div className="my-2 flex">
					<Profile />
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className="border border-solid border-customDark rounded-full px-6 py-3 h-12 flex-1 ml-4 flex">
							<div className="mr-2 relative">
								<FaRegSmile
									className={'cursor-pointer'}
									size={22}
									onClick={handleEmojiView}
								/>
								{isEmoji && (
									<div className=" absolute z-10 -top-[420px]">
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
								{...register('commentContents', {
									maxLength: {
										value: 2000,
										message: '최대 2000자까지 가능합니다',
									},
								})}
								fieldClass="hidden_border_textarea"
								placeholder="댓글을 입력 하세요."
							></FieldWithTextarea>
							<div className="flex items-center justify-center">
								<CustomButton
									type="submit"
									className="text-customOrange font-extrabold bg-basic text-sm"
									shadowNone={true}
								>
									POST
								</CustomButton>
							</div>
						</div>
					</form>
				</div>
			)}

			{comments.map(comment => (
				<CommentItem key={comment.id} comment={comment} depth={0} />
			))}
		</div>
	);
};

export default Comments;
