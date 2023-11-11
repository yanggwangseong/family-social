import { OmitStrict } from 'types';
import { AuthResponse } from './auth.interface';

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
	childrenComments?: OmitStrict<CommentsResponse, 'childrenComments'>[];
}
