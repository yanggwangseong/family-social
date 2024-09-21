import { roleType } from '@/models/entities/fam.entity';
import { MentionType, Union } from '@/types';

export const MENTION_ON_COMMENT = 'mention_on_comment' satisfies Union<
	typeof MentionType
>;
export const MENTION_ON_FEED = 'mention_on_feed' satisfies Union<
	typeof MentionType
>;

export const FAM_ROLE_USER = 'user' satisfies roleType;
export const MAIN_ROLE = 'main' satisfies roleType;
