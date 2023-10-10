import { FeedEntity } from '@/models/entities/feed.entity';
import { ICreateFeedArgs, IUpdateFeedArgs } from '@/types/args/feed';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FeedByIdResDto } from '../dto/feed/res/feed-by-id-res.dto';

@Injectable()
export class FeedsRepository extends Repository<FeedEntity> {
	constructor(
		@InjectRepository(FeedEntity)
		private readonly repository: Repository<FeedEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findOrFailFeedById({
		feedId,
	}: {
		feedId: string;
	}): Promise<FeedByIdResDto> {
		const feed = await this.repository.findOneOrFail({
			where: {
				id: feedId,
			},
			select: {
				id: true,
				isPublic: true,
			},
		});

		return feed;
	}

	async createFeed({
		contents,
		isPublic,
		groupId,
		memberId,
	}: Omit<ICreateFeedArgs, 'medias'>): Promise<FeedByIdResDto> {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			contents: contents,
			isPublic: isPublic,
			groupId: groupId,
			memberId: memberId,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailFeedById({ feedId: id });
	}

	async updateFeed({
		feedId,
		contents,
		isPublic,
		groupId,
	}: Omit<IUpdateFeedArgs, 'medias'>): Promise<FeedByIdResDto> {
		await this.update(
			{ id: feedId },
			{ contents: contents, isPublic: isPublic, groupId: groupId },
		);

		return this.findOrFailFeedById({ feedId: feedId });
	}

	async deleteFeed(feedId: string, manager?: EntityManager) {
		if (manager) {
			const { affected } = await manager.delete(FeedEntity, {
				id: feedId,
			});
			return !!affected;
		}
		const { affected } = await this.delete({
			id: feedId,
		});

		return !!affected;
	}
	// [TODO] 여기 트랜잭션이 필요할것 같다. feed media를 먼저 삭제하고 feed를 삭제해야 하기 때문에
	// feed media를 먼저 삭제하고, feed를 삭제하거나 할때 만약 에러가 나면 트랜잭션으로 롤백
	// 문제 없으면 트랜잭션 커밋 미디어랑 피드삭제, 또한 그거 뿐만 아니라 둘다 정상적으로 삭제가 된다면, 해당 이미지를 s3에서도 삭제해준다.
}
