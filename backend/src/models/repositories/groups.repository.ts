import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { MAIN_ROLE } from '@/constants/string-constants';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';
import { GroupEntity } from '@/models/entities/group.entity';
import { OverrideInsertFeild } from '@/types/repository';

import { GroupProfileResDto } from '../dto/group/res/group-profile.rest.dto';
import { CommentEntity } from '../entities/comment.entity';
import { LikeFeedEntity } from '../entities/like-feed.entity';

@Injectable()
export class GroupsRepository extends Repository<GroupEntity> {
	constructor(
		@InjectRepository(GroupEntity)
		private readonly repository: Repository<GroupEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getGroupsRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<GroupEntity>(GroupEntity)
			: this.repository;
	}

	async findGroupByGroupName({
		memberId,
		groupName,
	}: {
		memberId: string;
		groupName: string;
	}): Promise<number> {
		return await this.repository.count({
			where: {
				groupName,
				groupByMemberGroups: {
					memberId,
					role: MAIN_ROLE,
				},
			},
			relations: {
				groupByMemberGroups: true,
			},
		});
	}

	async findGroupById({
		groupId,
	}: {
		groupId: string;
	}): Promise<GroupProfileResDto | null> {
		const group = await this.repository.findOne({
			where: {
				id: groupId,
			},
			select: {
				id: true,
				groupName: true,
				groupDescription: true,
				groupCoverImage: true,
			},
		});

		return group;
	}

	async findOrFailGroupById(
		{
			groupId,
		}: {
			groupId: string;
		},
		qr?: QueryRunner,
	): Promise<GroupResDto> {
		const groupsRepository = this.getGroupsRepository(qr);

		const group = await groupsRepository.findOneOrFail({
			where: {
				id: groupId,
			},
			select: {
				id: true,
				groupName: true,
				groupDescription: true,
			},
		});

		return group;
	}

	async findFeedsByBelongToGroups({
		memberId,
		take,
		skip,
	}: {
		memberId: string;
		take: number;
		skip: number;
	}) {
		const query = this.repository
			.createQueryBuilder('group')
			.select([
				'group.id AS "groupId"',
				'group.groupName AS "groupName"',
				'group.groupDescription AS "groupDescription"',
				'group.groupCoverImage AS "groupCoverImage"',
				'feed.id AS "feedId"',
				'feed.contents AS "contents"',
				'feed.isPublic AS "isPublic"',
				'feed.isVisibleToFollowers AS "isVisibleToFollowers"',
				'member.id AS "memberId"',
				'member.username AS "username"',
				'member.profileImage AS "profileImage"',
				'member.email AS "email"',
			])
			.addSelect((qb) => {
				return qb
					.select('(CASE WHEN COUNT(*) = 0 THEN FALSE ELSE TRUE END)::bool')
					.from(LikeFeedEntity, 'lfa')
					.where('lfa.feedId = feed.id')
					.andWhere('lfa.memberId = :memberId', { memberId })
					.limit(1);
			}, 'myLike')
			.addSelect((qb) => {
				return qb
					.select('count(lf.feedId)')
					.from(LikeFeedEntity, 'lf')
					.where('lf.feedId = feed.id');
			}, 'sumLike')
			.addSelect((qb) => {
				return qb
					.select('count(cm.feedId)')
					.from(CommentEntity, 'cm')
					.where('cm.feedId = feed.id');
			}, 'sumComment')
			.innerJoin('group.feedByGroups', 'feed')
			.innerJoin('feed.member', 'member')
			.where('member.id = :memberId', { memberId })
			.orderBy('feed.updatedAt', 'DESC')
			.addOrderBy('feed.createdAt', 'DESC')
			.offset(skip)
			.limit(take);

		return query;
	}

	async createGroup(
		overrideInsertFeilds: OverrideInsertFeild<GroupEntity>,
		qr?: QueryRunner,
	): Promise<GroupResDto> {
		const groupsRepository = this.getGroupsRepository(qr);

		const insertResult = await groupsRepository.insert(overrideInsertFeilds);

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailGroupById({ groupId: id }, qr);
	}

	async updateGroup({
		groupId,
		...rest
	}: {
		groupId: string;
		groupName: string;
		groupDescription?: string;
	}): Promise<GroupResDto> {
		await this.update({ id: groupId }, { ...rest });
		return await this.findOrFailGroupById({ groupId });
	}

	async updateGroupCoverImage(groupId: string, imageUrl: string) {
		await this.update({ id: groupId }, { groupCoverImage: imageUrl });
	}

	async deleteGroup(
		{ groupId }: { groupId: string },
		qr?: QueryRunner,
	): Promise<boolean> {
		const groupsRepository = this.getGroupsRepository(qr);

		const { affected } = await groupsRepository.delete({
			id: groupId,
		});

		return !!affected;
	}

	async findAllGroupIds(): Promise<string[]> {
		return await this.repository
			.find({ select: { id: true } })
			.then((groups) => groups.map((group) => group.id));
	}
}
