import { OmitStrict } from 'types';
import { AuthResponse } from './auth.interface';
import { MentionsResponse } from './mention.interface';

export interface CommentsResponse {
	id: string;
	commentContents: string;
	updatedAt: string;
	replyId: string;
	parentId: string;
	feedId: string;
	myLikeByComment: boolean;
	sumLikeByComment: number;
	member: AuthResponse;
	mentions: MentionsResponse[];
	childrenComments?: OmitStrict<CommentsResponse, 'childrenComments'>[];
}
