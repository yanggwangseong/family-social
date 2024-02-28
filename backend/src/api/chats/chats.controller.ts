import {
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetMemberChatsSwagger } from '@/common/decorators/swagger/swagger-chat.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { EntityNotFoundException } from '@/common/exception/service.exception';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';

import { ChatsService } from './chats.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('chats')
@Controller('chats')
export class ChatsController {
	constructor(private readonly chatsService: ChatsService) {}

	/**
	 * @summary 유저가 속한 모든 채팅방 가져오기
	 *
	 * @tag chats
	 * @param {string} sub - 인증된 유저 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 채팅방 리스트
	 */
	@GetMemberChatsSwagger()
	@Get()
	async getMemberChats(@CurrentUser('sub') sub: string) {
		return await this.chatsService.getMemberBelongToChats(sub);
	}

	@Get('/:chatId/messages')
	async getMessagesByChatId(
		@Param('chatId', ParseUUIDPipe) chatId: string,
		@CurrentUser('sub') sub: string,
	) {
		const exists = await this.chatsService.checkIfChatExists(chatId);

		if (!exists) {
			throw EntityNotFoundException('존재하지 않는 chat 입니다');
		}

		return await this.chatsService.getMessagesByChat(chatId, sub);
	}
}
