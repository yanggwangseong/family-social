import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { GroupEntity } from '@/models/entities/group.entity';
import { IDeleteGroupArgs } from '@/types/args/group';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';

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

	async findOrFailGroupById({
		groupId,
	}: {
		groupId: string;
	}): Promise<GroupResDto> {
		const group = await this.repository.findOneOrFail({
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

	async createGroup({
		groupName,
		groupDescription,
	}: {
		groupName: string;
		groupDescription?: string;
	}): Promise<GroupResDto> {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			groupName: groupName,
			groupDescription: groupDescription,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailGroupById({ groupId: id });
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

	async deleteGroup({ groupId }: { groupId: string }): Promise<boolean> {
		const { affected } = await this.delete({
			id: groupId,
		});

		return !!affected;
	}
}
