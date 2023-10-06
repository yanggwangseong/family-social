import { Injectable } from '@nestjs/common';
import { GroupsRepository } from '@/models/repositories/groups.repository';
import {
	EntityConflictException,
	EntityNotFoundException,
	ForBiddenException,
	UnAuthOrizedException,
} from '@/common/exception/service.exception';
import { IDeleteGroupArgs } from '@/types/args/group';
import { FamsRepository } from '@/models/repositories/fams.repository';
import { GroupResDto } from '@/dto/group/res/group-res.dto';
import {
	ERROR_DELETE_GROUP,
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_DELETE_GROUP_SELF_ONLY_ADMIN,
	ERROR_DUPLICATE_GROUP_NAME,
	ERROR_GROUP_NOT_FOUND,
	ERROR_NO_PERMISSION_TO_DELETE_GROUP,
} from '@/constants/business-error';

@Injectable()
export class GroupsService {
	constructor(
		private readonly groupsRepository: GroupsRepository,
		private readonly famsRepository: FamsRepository,
	) {}

	async createGroup({
		memberId,
		groupName,
		groupDescription,
	}: {
		memberId: string;
		groupName: string;
		groupDescription?: string;
	}): Promise<GroupResDto> {
		// 중복된 그룹 이름 체크
		await this.checkDuplicateGroupName(memberId, groupName);

		const group = await this.groupsRepository.createGroup({
			groupName,
			groupDescription,
		});

		await this.famsRepository.createFam({
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
		groupDescription,
		memberId,
	}: {
		groupId: string;
		groupName: string;
		groupDescription?: string;
		memberId: string;
	}): Promise<GroupResDto> {
		// 그룹 유/무 체크
		const group = await this.findGroupByIdOrThrow(groupId);

		// 중복된 그룹 이름 체크
		await this.checkDuplicateGroupName(memberId, groupName);

		return await this.groupsRepository.updateGroup({
			groupId: groupId,
			groupName: groupName,
			groupDescription: groupDescription,
		});
	}

	async deleteGroup(deleteGroupArgs: IDeleteGroupArgs): Promise<void> {
		// 그룹 유/무 체크
		const group = await this.findGroupByIdOrThrow(deleteGroupArgs.groupId);

		// 해당 그룹의 권한이 main인지 체크
		const role = await this.famsRepository.isMainRoleForMemberInGroup({
			groupId: deleteGroupArgs.groupId,
			memberId: deleteGroupArgs.memberId,
		});

		if (role.role !== 'main') {
			throw ForBiddenException(ERROR_NO_PERMISSION_TO_DELETE_GROUP);
		}

		const count = await this.famsRepository.getMemberGroupCountByGroupId({
			groupId: group.id,
		});

		// 그룹 구성원이 main 1명일때만 삭제 가능.
		if (count !== 1) {
			throw ForBiddenException(ERROR_DELETE_GROUP_SELF_ONLY_ADMIN);
		}

		const [GroupMemberStatus, GroupStatus] = await Promise.all([
			await this.famsRepository.deleteGroupAllMember({
				groupId: group.id,
			}),
			await this.groupsRepository.deleteGroup({
				groupId: group.id,
			}),
		]);

		if (!GroupMemberStatus)
			throw EntityConflictException(ERROR_DELETE_GROUP_MEMBER);

		if (!GroupStatus) throw EntityConflictException(ERROR_DELETE_GROUP);
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
			throw EntityConflictException(ERROR_DUPLICATE_GROUP_NAME);
		}
	}

	async findGroupByIdOrThrow(groupId: string): Promise<GroupResDto> {
		const group = await this.groupsRepository.findGroupById({
			groupId,
		});

		if (!group) {
			throw EntityNotFoundException(ERROR_GROUP_NOT_FOUND);
		}

		return group;
	}
}
