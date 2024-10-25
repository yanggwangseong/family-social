import { FeedResDto } from '@/models/dto/feed/res/feed-res.dto';
import { GroupProfileResDto } from '@/models/dto/group/res/group-profile.rest.dto';
import { MediaCreateReqDto } from '@/models/dto/media/req/media-create-req.dto';
import { MemberSearchResDto } from '@/models/dto/member/res/member-search-res.dto';
import { MentionCreateReqDto } from '@/models/dto/mention/req/mention-create-req.dto';
import { FeedEntity } from '@/models/entities/feed.entity';

import { OmitStrict } from '../index';

export interface ICreateFeedArgs {
	contents: string;
	isPublic: boolean;
	isVisibleToFollowers: boolean;
	groupId: string;
	memberId: string;
	medias: MediaCreateReqDto[];
	mentions: MentionCreateReqDto[];
}

export interface IUpdateFeedArgs extends ICreateFeedArgs {
	feedId: string;
}

export interface IGetFeedDeatilArgs
	extends Pick<
		FeedEntity,
		'id' | 'contents' | 'isPublic' | 'isVisibleToFollowers'
	> {
	group: GroupProfileResDto;
	member: MemberSearchResDto;
}

export interface IGroupedFeedsItem
	extends OmitStrict<FeedResDto, 'medias' | 'comments' | 'mentions'> {}

export interface GroupedFeeds {
	[groupId: string]: {
		groupId: string;
		groupName: string;
		groupDescription?: string;
		groupCoverImage?: string;
		feeds: Omit<
			IGroupedFeedsItem,
			'groupId' | 'groupName' | 'groupDescription' | 'groupCoverImage'
		>[];
	};
}
