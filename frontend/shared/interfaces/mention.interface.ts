import { SearchMemberResponse } from './member.interface';

export interface MentionsResponse {
	id: string;
	mentionPosition: number;
	mentionRecipient: SearchMemberResponse[];
}
