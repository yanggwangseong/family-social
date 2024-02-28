import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { GetChatListResDto } from '@/models/dto/chat/res/get-chat-list-res.dto';

export const GetMemberChatsSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '유저가 속한 모든 채팅방 가져오기',
		}),
		ApiOkResponse({
			description: '그룹의 멤버 리스트 가져오기',
			type: GetChatListResDto,
			isArray: true,
		}),
	);
};
