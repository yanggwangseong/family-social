import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { MemberGroupRepository } from './member-group.repository';
import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { IUpdateGroupMemberInvitationAccept } from '@/types/args/member-group';
import { IDeleteGroupArgs } from '@/types/args/group';

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
		// 중복된 그룹 이름 체크
		await this.checkDuplicateGroupName(memberId, groupName);

		const group = await this.groupsRepository.createGroup({ groupName });

		await this.memberGroupRepository.createMemberGroup({
			memberId: memberId,
			groupId: group.id,
			role: 'main',
			invitationAccepted: true,
		});
		return group;
	}

	async updateGroup({
		groupId,
		groupName,
		memberId,
	}: {
		groupId: string;
		groupName: string;
		memberId: string;
	}) {
		// 그룹 유/무 체크
		const group = await this.findGroupByIdOrThrow(groupId);

		// 중복된 그룹 이름 체크
		await this.checkDuplicateGroupName(memberId, groupName);

		return await this.groupsRepository.updateGroup({
			groupId: groupId,
			groupName: groupName,
		});
	}

	async deleteGroup(deleteGroupArgs: IDeleteGroupArgs) {
		// 그룹 유/무 체크
		const group = await this.findGroupByIdOrThrow(deleteGroupArgs.groupId);
		// 해당 그룹의 권한이 main인지 체크
		const role = await this.memberGroupRepository.isMainRoleForMemberInGroup({
			groupId: deleteGroupArgs.groupId,
			memberId: deleteGroupArgs.memberId,
		});
		if (role.role !== 'main') {
			//[TODO] 401 에러로 변경
			throw EntityConflictException('그룹을 삭제 할 권한이 없습니다.');
		}

		const count = await this.memberGroupRepository.getMemberGroupCountByGroupId(
			{
				groupId: group.id,
			},
		);
		// 그룹 구성원이 main 1명일때만 삭제 가능.
		if (count !== 1) {
			throw EntityConflictException(
				'그룹 삭제시 그룹에 관리자 본인만 있을 때 가능 합니다.',
			);
		}

		const [GroupMemberStatus, GroupStatus] = await Promise.all([
			await this.memberGroupRepository.deleteGroupAllMember({
				groupId: group.id,
			}),
			await this.groupsRepository.deleteGroup({
				groupId: group.id,
			}),
		]);

		if (!GroupMemberStatus)
			throw EntityConflictException(
				'그룹멤버를 삭제하던 도중 에러가 발생했습니다.',
			);

		if (!GroupStatus)
			throw EntityConflictException(
				'그룹을 삭제하던 도중 에러가 발생했습니다.',
			);
	}

	async createMemberByGroup({
		memberId,
		groupId,
	}: {
		memberId: string;
		groupId: string;
	}) {
		// 그룹 유/무 체크
		const group = await this.findGroupByIdOrThrow(groupId);

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

	async groupMemberDelete({ groupMemberId }: { groupMemberId: string }) {
		const status =
			await this.memberGroupRepository.deleteGroupMemberByMemberGroupId({
				groupMemberId: groupMemberId,
			});

		if (!status)
			throw EntityConflictException(
				'그룹멤버를 삭제하던 도중 에러가 발생했습니다.',
			);
	}

	private async checkDuplicateGroupName(
		memberId: string,
		groupName: string,
	): Promise<void> {
		const count = await this.groupsRepository.findGroupByGroupName({
			memberId,
			groupName,
		});

		if (count > 0) {
			throw EntityConflictException('중복된 그룹 이름을 이미 가지고 있습니다.');
		}
	}

	private async findGroupByIdOrThrow(groupId: string) {
		const group = await this.groupsRepository.findGroupById({
			groupId,
		});

		if (!group) {
			throw EntityNotFoundException('그룹을 찾을 수 없습니다.');
		}

		return group;
	}
}
