import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { FC } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import FieldWithTextarea from '../field/field-area/FieldArea';
import CustomButton from '../button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import {
	CreateCommentRequest,
	UpdateCommentRequest,
} from '../feed/comment/comments-interface';
import { CommentService } from '@/services/comment/comment.service';
import axios from 'axios';
import { useEmoji } from '@/hooks/useEmoji';
import styles from './CommentForm.module.scss';
import MentionFieldArea from '../field/field-area/mention-field-area/MentionFieldArea';
import MentionField from '../mention/MentionField';

const CommentForm: FC<CommentFormProps> = ({
	onCommentRefetch,
	feedId,
	feedWriterId,
	parentId,
	replyId,
	isEdit,
	commentId,
	commentContents,
	handleCloseReply,
	handleEditComment,
}) => {
	// const {
	// 	register,
	// 	formState: { errors, isValid, isDirty },
	// 	setValue,
	// 	handleSubmit,
	// 	reset,
	// 	getValues,
	// 	watch,
	// 	getFieldState,
	// } = useForm<{ commentContents: string }>({
	// 	mode: 'onChange',
	// });

	const {
		handleSubmit,
		control,
		getValues,
		setValue,
		reset,
		formState: { errors },
	} = useForm<{ commentContents: string }>({
		defaultValues: {
			commentContents: '',
		},
	});

	const { isEmoji, handleEmojiView, handlesetValueAddEmoji } = useEmoji<{
		commentContents: string;
	}>(getValues, setValue);

	const { mutate: createCommentSync } = useMutation(
		['create-comment'],
		(data: CreateCommentRequest) => CommentService.createComment(data),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `댓글 작성 하였습니다.`, '확인');
				reset({ commentContents: '' });
				onCommentRefetch();
				handleCloseReply && handleCloseReply();
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

	const { mutate: updateCommentSync } = useMutation(
		['update-comment'],
		(data: UpdateCommentRequest) =>
			CommentService.updateComment({
				commentId,
				feedId,
				commentContents: data.commentContents,
			}),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `댓글을 수정 하였습니다.`, '확인');
				reset({ commentContents: '' });
				onCommentRefetch();
				handleCloseReply && handleCloseReply();
				handleEditComment && handleEditComment();
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
		console.log(data);
		// createCommentSync({
		// 	commentContents: data.commentContents,
		// 	feedId,
		// 	parentId,
		// 	replyId,
		// 	feedWriterId,
		// });
	};

	const onUpdateSubmit: SubmitHandler<{ commentContents: string }> = data => {
		console.log(data);
		// updateCommentSync(data);
	};

	return (
		<form onSubmit={handleSubmit(isEdit ? onUpdateSubmit : onSubmit)}>
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
				{/* <FieldWithTextarea
					{...register('commentContents', {
						maxLength: {
							value: 2000,
							message: '최대 2000자까지 가능합니다',
						},
					})}
					fieldClass="hidden_border_textarea"
					placeholder="댓글을 입력 하세요."
					defaultValue={commentContents}
				></FieldWithTextarea> */}
				<MentionField errors={errors} control={control}></MentionField>
				<div className={styles.comment_btn_container}>
					<CustomButton
						type="submit"
						className="text-customOrange font-extrabold bg-basic text-sm"
						shadowNone={true}
					>
						{isEdit ? `UPDATE` : `POST`}
					</CustomButton>
				</div>
			</div>
		</form>
	);
};

export default CommentForm;
