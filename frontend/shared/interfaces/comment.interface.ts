import { OmitStrict } from 'types';
import { MentionsResponse } from './mention.interface';
import { CreateCommentRequest } from '@/components/ui/feed/comment/comments-interface';
import { CreateMentionRequest } from '@/components/ui/form/comment-form.interface';
import { SearchMemberResponse } from './member.interface';

export interface CommentsResponse {
	id: string;
	commentContents: string;
	updatedAt: string;
	replyId: string;
	parentId: string;
	feedId: string;
	myLikeByComment: boolean;
	sumLikeByComment: number;
	member: SearchMemberResponse;
	mentions: MentionsResponse[];
	childrenComments?: OmitStrict<CommentsResponse, 'childrenComments'>[];
}

export interface CreateCommentRequestBody
	extends OmitStrict<CreateCommentRequest, 'feedId'> {}

export interface UpdateCommentArgs {
	feedId: string;
	commentId?: string;
	commentContents: string;
	mentions: CreateMentionRequest[];
}

export interface UpdateCommentRequest
	extends Pick<UpdateCommentArgs, 'commentContents' | 'mentions'> {}

export interface DeleteCommentArgs {
	feedId: string;
	commentId: string;
}
