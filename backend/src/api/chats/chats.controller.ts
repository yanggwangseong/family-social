import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryRunner } from 'typeorm';

import { IsResponseDtoDecorator } from '@/common/decorators/is-response-dto.decorator';
import { QueryRunnerDecorator } from '@/common/decorators/query-runner.decorator';
import {
	GetChatByIdSwagger,
	GetMemberChatsSwagger,
	GetMessagesByChatIdSwagger,
	PostChatSwagger,
} from '@/common/decorators/swagger/swagger-chat.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { CreateChatGroupMembershipGuard } from '@/common/guards/create-chat-group-membership.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ResponseDtoInterceptor } from '@/common/interceptors/reponse-dto.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { TransactionInterceptor } from '@/common/interceptors/transaction.interceptor';
import { parseUUIDPipeMessage } from '@/common/pipe-message/parse-uuid-pipe-message';
import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';
import { GetChatListResDto } from '@/models/dto/chat/res/get-chat-list-res.dto';
import { GetMessagesListResDto } from '@/models/dto/message/res/get-messages-list-res.dto';

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
	@UseInterceptors(ResponseDtoInterceptor<GetChatListResDto>)
	@IsResponseDtoDecorator<GetChatListResDto>(GetChatListResDto)
	@Get()
	async getMemberChats(@CurrentUser('sub') sub: string) {
		return await this.chatsService.getMemberBelongToChats(sub);
	}

	/**
	 * @summary 채팅방 아이디로 채팅방 가져오기
	 *
	 * @tag chats
	 * @param sub - 인증된 유저 아이디
	 * @param chatId - 채팅방 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 채팅방 리스트
	 */
	@GetChatByIdSwagger()
	@UseInterceptors(ResponseDtoInterceptor<GetChatListResDto>)
	@IsResponseDtoDecorator<GetChatListResDto>(GetChatListResDto)
	@Get('/:chatId')
	async getChatById(
		@Param(
			'chatId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		chatId: string,
	) {
		return await this.chatsService.getChatById(chatId);
	}

	/**
	 * @summary 채팅방 생성하기
	 *
	 * @tag chats
	 * @param {string[]} dto.memberIds - 채팅참여 멤버 아이디들
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 생성된 채팅방 아이디
	 */
	@PostChatSwagger()
	@UseGuards(CreateChatGroupMembershipGuard)
	@UseInterceptors(TransactionInterceptor)
	@Post()
	async postChat(
		@Body() dto: ChatCreateReqDto,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		/**
		 * 이미 존재하는 채팅방일 경우 해당 채티방 id를 return
		 */
		const existingChat = await this.chatsService.getExistingChat(
			dto.chatType,
			dto.memberIds,
		);

		if (existingChat) {
			return existingChat.id;
		}

		return await this.chatsService.createChat(dto, qr);
	}

	/**
	 * @summary 특정 채팅방의 메세지들 가져오기
	 *
	 * @tag chats
	 * @param {string} sub - 인증된 유저 아이디
	 * @param {string} chatId - 채팅방 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 메세지 리스트
	 */
	@GetMessagesByChatIdSwagger()
	@UseInterceptors(ResponseDtoInterceptor<GetMessagesListResDto>)
	@IsResponseDtoDecorator<GetMessagesListResDto>(GetMessagesListResDto)
	@Get('/:chatId/messages')
	async getMessagesByChatId(
		@Param(
			'chatId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		chatId: string,
		@CurrentUser('sub') sub: string,
	) {
		return await this.chatsService.getMessagesByChat(chatId, sub);
	}
}
