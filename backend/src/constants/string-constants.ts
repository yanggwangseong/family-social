import { roleType } from '@/models/entities/fam.entity';
import {
	AlarmType,
	LikeCacheType,
	MentionType,
	SearchType,
	Union,
} from '@/types';

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

export const SEARCH_TYPE_TOUR = 'tour' satisfies Union<typeof SearchType>;
export const SEARCH_TYPE_MEMBER = 'member' satisfies Union<typeof SearchType>;

export const LIKE_CACHE_TYPE_FEED = 'feed' satisfies Union<
	typeof LikeCacheType
>;

export const LIKE_CACHE_TYPE_COMMENT = 'comment' satisfies Union<
	typeof LikeCacheType
>;
