import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { MemberGroupRepository } from './member-group.repository';
import { EntityConflictException } from '@/common/exception/service.exception';

@Injectable()
export class GroupsService {
	constructor(
		private readonly groupsRepository: GroupsRepository,
		private readonly memberGroupRepository: MemberGroupRepository,
	) {}

	async createGroup({
		memberId,
		groupName,
	}: {
		memberId: string;
		groupName: string;
	}) {
		const count = await this.groupsRepository.findGroupByGroupName({
			memberId,
			groupName,
		});

		if (count > 0) {
			throw EntityConflictException('중복된 그룹 이름을 이미 가지고 있습니다.');
		}

		const group = await this.groupsRepository.createGroup({ groupName });

		await this.memberGroupRepository.createMemberGroup({
			memberId: memberId,
			groupId: group.id,
			role: 'main',
			invitationAccepted: true,
		});
		return group;
	}
}
