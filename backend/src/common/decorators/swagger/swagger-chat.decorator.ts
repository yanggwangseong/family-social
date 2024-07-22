import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import { ERROR_CHAT_NOT_FOUND } from '@/constants/business-error';
import { GetChatListResDto } from '@/models/dto/chat/res/get-chat-list-res.dto';
import { GetMessagesListResDto } from '@/models/dto/message/res/get-messages-list-res.dto';

import { SuccessResponse } from './sucess-response.decorator';

export const GetMemberChatsSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '유저가 속한 모든 채팅방 가져오기',
		}),
		// ApiOkResponse({
		// 	description: '유저가 속한 모든 채팅방 가져오기',
		// 	type: GetChatListResDto,
		// }),
		SuccessResponse(HttpStatus.OK, [
			{
				model: GetChatListResDto,
				exampleTitle: '채팅방 리스트 가져오기',
				exampleDescription: '유저가 속한 모든 채팅방 가져오기',
			},
		]),
	);
};

export const PostChatSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '채팅방 생성하기',
		}),
		ApiOkResponse({
			description: '채팅방 생성하기',
		}),
	);
};

export const GetMessagesByChatIdSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 채팅방의 메세지들 가져오기',
		}),
		ApiOkResponse({
			description: '특정 채팅방의 메세지들 가져오기',
			type: GetMessagesListResDto,
		}),
		ApiNotFoundResponse({
			description: ERROR_CHAT_NOT_FOUND,
		}),
	);
};
