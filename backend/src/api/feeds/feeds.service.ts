import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { ICreateFeedArgs } from '@/types/args/feed';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedsService {
	constructor(private readonly feedsRepository: FeedsRepository) {}

	async createFeed({
		contents,
		isPublic,
		groupId,
		memberId,
	}: ICreateFeedArgs): Promise<FeedByIdResDto> {
		//[TODO] 이미지배열과, 피드 관련 정보 가져와서 feed repository에는 피드저장, midea repository에는 미디어들 저장
		return await this.feedsRepository.createFeed({
			contents,
			isPublic,
			groupId,
			memberId,
		});
	}
}
