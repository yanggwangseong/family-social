import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, QueryRunner, Repository } from 'typeorm';

import { FeedEntity } from '@/models/entities/feed.entity';
import { IGetFeedDeatilArgs, IUpdateFeedArgs } from '@/types/args/feed';
import { OverrideInsertFeild } from '@/types/repository';

import { FeedByIdResDto } from '../dto/feed/res/feed-by-id-res.dto';
import { CommentEntity } from '../entities/comment.entity';
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
		groupId,
	}: {
		take: number;
		skip: number;
		memberId: string;
		options: 'TOP' | 'MYFEED' | 'ALL' | 'GROUPFEED';

		groupId?: string;
	}) {
		const query = this.repository
			.createQueryBuilder('a')
			.select([
				'a.id AS "feedId"',
				'a.contents AS "contents"',
				'a.isPublic AS "isPublic"',
				'group.id AS "groupId"',
				'group.groupName AS "groupName"',
				'group.groupDescription AS "groupDescription"',
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
			.addSelect((qb) => {
				return qb
					.select('count(cm.feedId)')
					.from(CommentEntity, 'cm')
					.where('cm.feedId = a.id');
			}, 'sumComment')
			.innerJoin('a.group', 'group')
			.innerJoin('a.member', 'member')
			.orderBy('a.updatedAt', 'DESC')
			.addOrderBy('a.createdAt', 'DESC')
			.offset(skip)
			.limit(take);

		// 'TOP' | 'MYFEED' | 'ALL' | 'GROUPFEED'
		// TOP public 상태 , 좋아요 갯수 순과 댓글 갯수 순 , 최신순 , 생성날짜 순
		// MYFEED memberId가 자신인지와 최신순, 생성 날짜 순
		// ALL 자신의 게시글이면 private라도 가져오기, 이외에는 Public글만 가져오기, 최신순, 생성날짜 순
		// GROUPFEED 그룹 아이디에 해당하는 게시글만 가져오기, 자신의 게시글이면 private라도 가져오기, 이외에는 Public글만 가져오기, 최신순, 생성날짜 순

		if (options === 'TOP') {
			query.where('a.isPublic = :isPublic', { isPublic: true });
		} else if (options === 'MYFEED') {
			query.where('a.memberId = :memberId', { memberId });
		} else if (options === 'ALL') {
			query.where('a.isPublic = :isPublic', { isPublic: true });
			query.orWhere(
				new Brackets((qb2) => {
					qb2
						.where('a.memberId = :memberId', { memberId })
						.andWhere('a.isPublic = :isPrivate', { isPrivate: false });
				}),
			);
		} else if (options === 'GROUPFEED') {
			query.where('a.groupId = :groupId', { groupId });
			query.orWhere(
				new Brackets((qb2) => {
					qb2
						.where('a.memberId = :memberId', { memberId })
						.andWhere('a.isPublic = :isPrivate', { isPrivate: false });
				}),
			);
		}

		return query;
	}

	async findOrFailFeedById(
		feedId: string,
		qr?: QueryRunner,
	): Promise<FeedByIdResDto> {
		const feedsRepository = this.getFeedsRepository(qr);

		const feed = await feedsRepository.findOneOrFail({
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
		overrideInsertFeilds: OverrideInsertFeild<FeedEntity>,
		qr?: QueryRunner,
	): Promise<FeedByIdResDto> {
		const feedsRepository = this.getFeedsRepository(qr);

		const insertResult = await feedsRepository.insert(overrideInsertFeilds);

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailFeedById(id, qr);
	}

	async updateFeed(
		{ feedId, ...rest }: Omit<IUpdateFeedArgs, 'medias'>,
		qr?: QueryRunner,
	): Promise<FeedByIdResDto> {
		const feedsRepository = this.getFeedsRepository(qr);

		await feedsRepository.update({ id: feedId }, { ...rest });

		return this.findOrFailFeedById(feedId, qr);
	}

	async deleteFeed(feedId: string, qr?: QueryRunner) {
		const feedsRepository = this.getFeedsRepository(qr);

		const { affected } = await feedsRepository.delete({
			id: feedId,
		});

		return !!affected;
	}

	async findAllFeedIds(): Promise<string[]> {
		return await this.repository
			.find({ select: { id: true } })
			.then((feeds) => feeds.map((feed) => feed.id));
	}
}
