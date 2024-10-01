import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GroupsService } from '@/api/groups/groups.service';
import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';

import { ForBiddenException } from '../exception/service.exception';

@Injectable()
export class CreateChatGroupMembershipGuard implements CanActivate {
	constructor(private readonly groupsService: GroupsService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const { sub } = req.user;
		const { groupId, memberIds, chatType }: Required<ChatCreateReqDto> =
			req.body;

		/**
		 * 채팅 타입이 다이렉트면 그룹 소속 검사를 하지 않음
		 */
		if (chatType === 'DIRECT') return true;

		const memberIdsSet = new Set(memberIds);
		const isMember = memberIdsSet.has(sub);

		this.checkGroupMembership(isMember, sub);

		for (const memberId of memberIdsSet) {
			const isMember = await this.groupsService.memberShipOfGroupExists(
				groupId,
				memberId,
			);
			this.checkGroupMembership(isMember, memberId);
		}

		return true;
	}

	private checkGroupMembership(isMember: boolean, memberId: string) {
		if (!isMember) {
			throw ForBiddenException(
				`해당 멤버 ${memberId} 가 그룹에 소속되어 있지 않습니다.`,
			);
		}
	}
}
