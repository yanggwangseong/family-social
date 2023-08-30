import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
	constructor(private readonly groupsRepository: GroupsRepository) {}

	async createGroup({ groupName }: { groupName: string }) {
		return await this.groupsRepository.createGroup({ groupName });
	}
}
