import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { FC } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import CustomButton from '../button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {
	CreateCommentRequest,
	UpdateCommentRequest,
} from '../feed/comment/comments-interface';
import { CommentService } from '@/services/comment/comment.service';
import { useEmoji } from '@/hooks/useEmoji';
import styles from './CommentForm.module.scss';
import MentionField from '../mention/MentionField';
import { CommentFormProps } from './comment-form.interface';
import { extractMention } from '@/utils/extract-mention';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import { useCreateMutation } from '@/hooks/useCreateMutation';

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

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const {
		handleSubmit,
		control,
		getValues,
		setValue,
		reset,
		formState: { errors },
	} = useForm<{ commentContents: string }>({
		mode: 'onChange',
		defaultValues: {
			commentContents: isEdit ? commentContents : '',
		},
	});

	const { isEmoji, handleEmojiView, handlesetValueAddEmoji } = useEmoji<{
		commentContents: string;
	}>(getValues, setValue);

	const { mutate: createCommentSync } = useCreateMutation(
		async (data: CreateCommentRequest) =>
			await CommentService.createComment(data),
		{
			mutationKey: ['create-comment'],
			onSuccess() {
				Loading.remove();

				handleSuccessLayerModal({
					modalTitle: '댓글 생성',
					layer: LayerMode.successLayerModal,
					lottieFile: 'createCommentAnimation',
					message: '댓글 생성 하였습니다',
					onConfirm() {
						reset({ commentContents: '' });
						onCommentRefetch();
						handleCloseReply && handleCloseReply();
					},
				});
			},
		},
	);

	const { mutate: updateCommentSync } = useCreateMutation(
		async (data: UpdateCommentRequest) =>
			await CommentService.updateComment({
				commentId,
				feedId,
				commentContents: data.commentContents,
				mentions: data.mentions,
			}),
		{
			mutationKey: ['update-comment'],
			onSuccess() {
				Loading.remove();

				handleSuccessLayerModal({
					modalTitle: '댓글 수정',
					layer: LayerMode.successLayerModal,
					lottieFile: 'createCommentAnimation',
					message: '댓글 수정 하였습니다',
					onConfirm() {
						reset({ commentContents: '' });
						onCommentRefetch();
						handleCloseReply && handleCloseReply();
						handleEditComment && handleEditComment();
					},
				});
			},
		},
	);

	const handleAddEmojiValue = (emojiData: EmojiClickData) => {
		handlesetValueAddEmoji(emojiData, 'commentContents');
	};

	const onSubmit: SubmitHandler<{ commentContents: string }> = data => {
		const mentions = extractMention(data.commentContents);

		createCommentSync({
			commentContents: data.commentContents,
			feedId,
			parentId,
			replyId,
			feedWriterId,
			mentions,
		});
	};

	const onUpdateSubmit: SubmitHandler<{ commentContents: string }> = data => {
		const mentions = extractMention(data.commentContents);

		updateCommentSync({
			commentContents: data.commentContents,
			mentions,
		});
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

				<div className={styles.comment_field_container}>
					<MentionField
						control={control}
						fieldName="commentContents"
						validationOptions={{
							required: '댓글을 작성해주세요!',
							maxLength: {
								value: 2000,
								message: '최대 2000자까지 가능합니다',
							},
						}}
						placeholderText={'댓글을 입력 하세요.'}
					></MentionField>
				</div>

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
			{errors.commentContents && (
				<div className={styles.field_error}>
					{errors.commentContents.message}
				</div>
			)}
		</form>
	);
};

export default CommentForm;
