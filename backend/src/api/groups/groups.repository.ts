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

	async findGroupById({ groupId }: { groupId: string }) {
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

		return this.findGroupById({ groupId: id });
	}
}
