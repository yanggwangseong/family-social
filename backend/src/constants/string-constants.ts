import { roleType } from '@/models/entities/fam.entity';
import { AlarmType, MentionType, Union } from '@/types';

export const MENTION_ON_COMMENT = 'mention_on_comment' satisfies Union<
	typeof MentionType
>;
export const MENTION_ON_FEED = 'mention_on_feed' satisfies Union<
	typeof MentionType
>;

export const COMMENT_ON_MY_POST = 'comment_on_my_post' satisfies Union<
	typeof AlarmType
>;
export const LIKE_ON_MY_POST = 'like_on_my_post' satisfies Union<
	typeof AlarmType
>;

export const FAM_ROLE_USER = 'user' satisfies roleType;
export const MAIN_ROLE = 'main' satisfies roleType;
