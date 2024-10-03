import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { GroupsService } from '@/api/groups/groups.service';
import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';

@Injectable()
export class ChatGroupMembershipGuard implements CanActivate {
	constructor(private readonly groupsService: GroupsService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const socket = context.switchToWs().getClient<Socket & { sub: string }>();
		const data = context.switchToWs().getData<Required<ChatCreateReqDto>>(); // GroupId가 무조건 존재하니까 Required

		const { memberIds, groupId, chatType } = data;

		/**
		 * 채팅 타입이 다이렉트면 그룹 소속 검사를 하지 않음
		 */
		if (chatType === 'DIRECT') return true;

		const { sub } = socket;

		const memberIdsSet = new Set(memberIds);
		const isMember = memberIdsSet.has(sub);

		if (!isMember) {
			throw new WsException(
				`해당 멤버 ${sub} 가 그룹에 소속되어 있지 않습니다.`,
			);
		}

		for (const memberId of memberIdsSet) {
			const isMember = await this.groupsService.memberShipOfGroupExists(
				groupId,
				memberId,
			);
			if (!isMember) {
				throw new WsException(
					`해당 멤버 ${memberId} 가 그룹에 소속되어 있지 않습니다.`,
				);
			}
		}

		return true;
	}
}
