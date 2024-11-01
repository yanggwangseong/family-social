import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, QueryRunner, Repository } from 'typeorm';

import { MAIN_ROLE } from '@/constants/string-constants';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';
import { GroupEntity } from '@/models/entities/group.entity';
import { OverrideInsertFeild } from '@/types/repository';

import { GroupProfileResDto } from '../dto/group/res/group-profile.rest.dto';

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

	async getGroupByGroupId(groupId: string, memberId: string) {
		return await this.repository
			.findOneOrFail({
				select: {
					id: true,
					groupName: true,
					groupCoverImage: true,
					groupDescription: true,
					groupByMemberGroups: {
						id: true,
						invitationAccepted: true,
						role: true,
						memberId: true,
					},
				},
				where: {
					id: groupId,
					groupByMemberGroups: {
						invitationAccepted: true,
						memberId,
					},
				},
				relations: {
					groupByMemberGroups: true,
				},
			})
			.then((group) => {
				const { groupByMemberGroups, ...rest } = group;
				if (groupByMemberGroups) {
					return {
						...rest,
						fam: {
							id: groupByMemberGroups[0].id,
							role: groupByMemberGroups[0].role,
							invitationAccepted: groupByMemberGroups[0].invitationAccepted,
						},
					};
				}

				return group;
			});
	}

	async getGroupByGroupIdPublic(groupId: string) {
		return await this.repository.findOneOrFail({
			select: {
				id: true,
				groupName: true,
				groupCoverImage: true,
				groupDescription: true,
			},
			where: { id: groupId },
		});
	}

	/**
	 * @summary 그룹 이름에 해당하는 그룹 리스트 검색
	 * @description 인증된 사용자가 속한 그룹 제외
	 * @param groupName 그룹 이름
	 * @param memberId 인증된 사용자 아이디
	 * @returns 검색된 그룹 정보 리스트
	 */
	async findGroupsByGroupName(
		groupName: string,
		memberId: string,
	): Promise<GroupProfileResDto[]> {
		return await this.repository
			.find({
				select: {
					id: true,
					groupName: true,
					groupDescription: true,
					groupCoverImage: true,
					groupByMemberGroups: {
						groupId: true,
						memberId: true,
					},
				},
				where: {
					groupName: ILike(`${groupName}%`),
					groupByMemberGroups: {
						memberId: Not(memberId),
					},
				},
				relations: {
					groupByMemberGroups: true,
				},
			})
			.then((groups) =>
				groups.map((group) => ({
					id: group.id,
					groupName: group.groupName,
					groupDescription: group.groupDescription,
					groupCoverImage: group.groupCoverImage,
				})),
			);
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
