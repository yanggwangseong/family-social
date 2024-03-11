import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { GroupResDto } from '@/models/dto/group/res/group-res.dto';
import { GroupEntity } from '@/models/entities/group.entity';
import { ICreateGroupArgs } from '@/types/args/group';

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
				groupName: groupName,
				groupByMemberGroups: {
					memberId: memberId,
					role: 'main',
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
	}): Promise<GroupResDto | null> {
		const group = await this.repository.findOne({
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
		{ groupName, groupDescription }: Omit<ICreateGroupArgs, 'memberId'>,
		qr?: QueryRunner,
	): Promise<GroupResDto> {
		const groupsRepository = this.getGroupsRepository(qr);

		const insertResult = await groupsRepository.insert({
			id: uuidv4(),
			groupName: groupName,
			groupDescription: groupDescription,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailGroupById({ groupId: id }, qr);
	}

	async updateGroup({
		groupName,
		groupDescription,
		groupId,
	}: {
		groupName: string;
		groupDescription?: string;
		groupId: string;
	}): Promise<GroupResDto> {
		await this.update(
			{ id: groupId },
			{ groupName: groupName, groupDescription: groupDescription },
		);
		return await this.findOrFailGroupById({ groupId: groupId });
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
}
