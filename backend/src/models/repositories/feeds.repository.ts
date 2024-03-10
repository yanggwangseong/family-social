import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { FeedEntity } from '@/models/entities/feed.entity';
import {
	ICreateFeedArgs,
	IGetFeedDeatilArgs,
	IUpdateFeedArgs,
} from '@/types/args/feed';

import { FeedByIdResDto } from '../dto/feed/res/feed-by-id-res.dto';
import { FeedResDto } from '../dto/feed/res/feed-res.dto';
import { LikeFeedEntity } from '../entities/like-feed.entity';

@Injectable()
export class FeedsRepository extends Repository<FeedEntity> {
	constructor(
		@InjectRepository(FeedEntity)
		private readonly repository: Repository<FeedEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getFeedsRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<FeedEntity>(FeedEntity)
			: this.repository;
	}

	async findFeedById(feedId: string): Promise<FeedByIdResDto | null> {
		return await this.repository.findOne({
			where: {
				id: feedId,
			},
			select: {
				id: true,
				isPublic: true,
			},
		});
	}

	async findFeedInfoById(feedId: string): Promise<IGetFeedDeatilArgs> {
		const feed = await this.repository.findOneOrFail({
			where: {
				id: feedId,
			},
			select: {
				id: true,
				contents: true,
				isPublic: true,
				group: {
					id: true,
					groupName: true,
					groupDescription: true,
				},
				member: {
					id: true,
					username: true,
				},
			},

			relations: {
				group: true,
				member: true,
			},
		});

		return feed;
	}

	async findAllFeed({
		take,
		skip,
		memberId,
		options,
	}: {
		take: number;
		skip: number;
		memberId: string;
		options: 'TOP' | 'MYFEED' | 'ALL';
	}): Promise<{ list: Omit<FeedResDto, 'medias'>[]; count: number }> {
		const query = this.repository
			.createQueryBuilder('a')
			.select([
				'a.id AS "feedId"',
				'a.contents AS "contents"',
				'a.isPublic AS "isPublic"',
				'group.id AS "groupId"',
				'group.groupName AS "groupName"',
				'member.id AS "memberId"',
				'member.username AS "username"',
			])
			.addSelect((qb) => {
				return qb
					.select('(CASE WHEN COUNT(*) = 0 THEN FALSE ELSE TRUE END)::bool')
					.from(LikeFeedEntity, 'lfa')
					.where('lfa.feedId = a.id')
					.andWhere('lfa.memberId = :memberId', { memberId })
					.limit(1);
			}, 'myLike')
			.addSelect((qb) => {
				return qb
					.select('count(lf.feedId)')
					.from(LikeFeedEntity, 'lf')
					.where('lf.feedId = a.id');
			}, 'sumLike')
			.innerJoin('a.group', 'group')
			.innerJoin('a.member', 'member')
			.orderBy('a.updatedAt', 'DESC')
			.offset(skip)
			.limit(take);

		if (options === 'MYFEED') {
			query.where('a.memberId = :memberId', { memberId });
		} else {
			query.where('a.isPublic = :isPublic', { isPublic: true });
		}

		const [list, count] = await Promise.all([
			query.getRawMany(),
			query.getCount(),
		]);

		return {
			list,
			count,
		};
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

	async createFeed(
		{ contents, isPublic, groupId, memberId }: Omit<ICreateFeedArgs, 'medias'>,
		qr?: QueryRunner,
	): Promise<FeedByIdResDto> {
		const feedsRepository = this.getFeedsRepository(qr);

		const insertResult = await feedsRepository.insert({
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
