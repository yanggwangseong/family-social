import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	ERROR_GROUP_EVENT_NOT_FOUND,
	ERROR_GROUP_EVENT_TYPE_NOT_FOUND,
	ERROR_GROUP_NOT_FOUND,
	ERROR_NO_PERMISSTION_TO_GROUP,
	ERROR_NO_PERMISSTION_TO_GROUP_EVENT,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';
import { GroupEventItemResDto } from '@/models/dto/group-event/res/group-event-item-res.dto';

export const GetGroupEventByGroupEventIdSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '단일 피드 가져오기',
		}),
		ApiOkResponse({
			description: '단일 피드 가져오기',
			type: GroupEventItemResDto,
		}),
		ApiNotFoundResponse({
			description: ERROR_GROUP_NOT_FOUND,
		}),
		ApiForbiddenResponse({
			description: `1. ${ERROR_NO_PERMISSTION_TO_GROUP} \n2. ${ERROR_NO_PERMISSTION_TO_GROUP_EVENT}`,
		}),
	);
};

export const PostGroupEventSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 생성',
		}),
		ApiCreatedResponse({
			description: '특정 그룹의 그룹 이벤트 생성 성공',
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_GROUP_EVENT_TYPE_NOT_FOUND} \n2. ${ERROR_GROUP_NOT_FOUND}`,
		}),
		ApiForbiddenResponse({
			description: ERROR_NO_PERMISSTION_TO_GROUP,
		}),
	);
};

export const DeleteGroupEventSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 삭제',
		}),
		ApiCreatedResponse({
			description: '특정 그룹의 그룹 이벤트 삭제 성공',
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_GROUP_EVENT_NOT_FOUND} \n2. ${ERROR_GROUP_NOT_FOUND}`,
		}),
		ApiForbiddenResponse({
			description: `1. ${ERROR_NO_PERMISSTION_TO_GROUP} \n2. ${ERROR_NO_PERMISSTION_TO_GROUP_EVENT}`,
		}),
		ApiBadRequestResponse({
			description: ERROR_UUID_PIPE_MESSAGE,
		}),
	);
};

export const PutGroupEventSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 수정',
		}),
		ApiCreatedResponse({
			description: '특정 그룹의 그룹 이벤트 수정',
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_GROUP_EVENT_NOT_FOUND} \n2. ${ERROR_GROUP_NOT_FOUND}`,
		}),
		ApiForbiddenResponse({
			description: `1. ${ERROR_NO_PERMISSTION_TO_GROUP} \n2. ${ERROR_NO_PERMISSTION_TO_GROUP_EVENT}`,
		}),
		ApiBadRequestResponse({
			description: ERROR_UUID_PIPE_MESSAGE,
		}),
	);
};
