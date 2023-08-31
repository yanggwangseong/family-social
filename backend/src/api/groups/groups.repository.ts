import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { GroupEntity } from '@/entities/group.entity';

@Injectable()
export class GroupsRepository extends Repository<GroupEntity> {
	constructor(
		@InjectRepository(GroupEntity)
		private readonly repository: Repository<GroupEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findGroupByGroupName({
		memberId,
		groupName,
	}: {
		memberId: string;
		groupName: string;
	}) {
		return await this.repository.count({
			where: {
				groupName: groupName,
				groupByMemberGroups: {
					memberId: memberId,
					role: 'main',
				},
			},
			relations: ['groupByMemberGroups'],
		});
	}

	async findGroupById({ groupId }: { groupId: string }) {
		const group = await this.repository.findOne({
			where: {
				id: groupId,
			},
			select: {
				id: true,
				groupName: true,
			},
		});

		return group;
	}

	async findOrFailGroupById({ groupId }: { groupId: string }) {
		const group = await this.repository.findOneOrFail({
			where: {
				id: groupId,
			},
			select: {
				id: true,
				groupName: true,
			},
		});

		return group;
	}

	async createGroup({ groupName }: { groupName: string }) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			groupName: groupName,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailGroupById({ groupId: id });
	}

	async updateGroup({
		groupName,
		groupId,
	}: {
		groupName: string;
		groupId: string;
	}) {
		await this.update({ id: groupId }, { groupName: groupName });
		return await this.findOrFailGroupById({ groupId: groupId });
	}
}
