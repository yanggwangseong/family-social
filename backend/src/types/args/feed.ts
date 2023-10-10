import { MediaCreateReqDto } from '@/models/dto/media/req/media-create-req.dto';

export interface ICreateFeedArgs {
	contents: string;
	isPublic: boolean;
	groupId: string;
	memberId: string;
	medias: MediaCreateReqDto[];
}

export interface IUpdateFeedArgs extends Omit<ICreateFeedArgs, 'memberId'> {
	feedId: string;
}
