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

		const isMember = await this.groupsService.memberShipOfGroupExists(
			groupId,
			sub,
		);

		this.checkGroupMembership(isMember, sub);

		/**
		 * 그룹 권한 main인지 체크
		 * main인 권한을 가진 사람만 생성 가능
		 */
		await this.groupsService.checkMainRole(groupId, sub);

		for (const memberId of memberIds) {
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
