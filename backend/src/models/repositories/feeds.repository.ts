import { FeedEntity } from '@/models/entities/feed.entity';
import { ICreateFeedArgs } from '@/types/args/feed';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
	}: ICreateFeedArgs): Promise<FeedByIdResDto> {
		console.log('groupId=', groupId);
		console.log('groupId=', memberId);
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
}
