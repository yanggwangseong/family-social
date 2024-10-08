import { GroupProfileResDto } from '@/models/dto/group/res/group-profile.rest.dto';
import { MediaCreateReqDto } from '@/models/dto/media/req/media-create-req.dto';
import { MemberSearchResDto } from '@/models/dto/member/res/member-search-res.dto';
import { MentionCreateReqDto } from '@/models/dto/mention/req/mention-create-req.dto';
import { FeedEntity } from '@/models/entities/feed.entity';

export interface ICreateFeedArgs {
	contents: string;
	isPublic: boolean;
	groupId: string;
	memberId: string;
	medias: MediaCreateReqDto[];
	mentions: MentionCreateReqDto[];
}

export interface IUpdateFeedArgs extends ICreateFeedArgs {
	feedId: string;
}

export interface IGetFeedDeatilArgs
	extends Pick<FeedEntity, 'id' | 'contents' | 'isPublic'> {
	group: GroupProfileResDto;
	member: MemberSearchResDto;
}
