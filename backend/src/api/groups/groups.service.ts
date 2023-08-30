import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { MemberGroupRepository } from './member-group.repository';
import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { IUpdateGroupMemberInvitationAccept } from '@/types/args/member-group';

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

	async createMemberByGroup({
		memberId,
		groupId,
	}: {
		memberId: string;
		groupId: string;
	}) {
		const group = await this.groupsRepository.findGroupById({
			groupId: groupId,
		});
		if (!group) throw EntityNotFoundException('그룹을 찾을 수 없습니다.');

		await this.memberGroupRepository.createMemberGroup({
			memberId: memberId,
			groupId: groupId,
			role: 'user',
			invitationAccepted: false,
		});
		//[TODO] 그룹 초대 notification
	}

	async groupMemberInvitationAccept(
		updateGroupMemberInvitationAccept: IUpdateGroupMemberInvitationAccept,
	) {
		const group = await this.memberGroupRepository.findMemberGroupById({
			memberGroupId: updateGroupMemberInvitationAccept.memberGroupId,
			memberId: updateGroupMemberInvitationAccept.memberId,
		});
		if (!group)
			throw EntityNotFoundException('초대 받은 그룹을 찾을 수 없습니다.');

		await this.memberGroupRepository.updateGroupMemberInvitationAccept({
			memberId: updateGroupMemberInvitationAccept.memberId,
			memberGroupId: updateGroupMemberInvitationAccept.memberGroupId,
			invitationAccepted: updateGroupMemberInvitationAccept.invitationAccepted,
		});
	}
}
