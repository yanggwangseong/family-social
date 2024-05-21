import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConsumes,
	ApiNotFoundResponse,
	ApiOperation,
	ApiResponse,
} from '@nestjs/swagger';

import {
	ERROR_FILE_NOT_FOUND,
	ERROR_GROUP_NOT_FOUND,
	ERROR_NO_PERMISSTION_TO_GROUP,
	ERROR_SCHEDULE_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';

export const PostUploadProfileSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 프로필 업로드',
		}),
		ApiBody({
			schema: {
				type: 'object',
				properties: {
					files: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		}),
		ApiConsumes('multipart/form-data'),
		ApiResponse({
			description: '멤버 프로필 업로드',
			isArray: true,
			type: String,
		}),
		ApiBadRequestResponse({
			description: ERROR_FILE_NOT_FOUND,
		}),
	);
};

export const PatchUploadMemberCoverImageSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 커버 이미지 업로드',
		}),
		ApiBody({
			schema: {
				type: 'object',
				properties: {
					files: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		}),
		ApiConsumes('multipart/form-data'),
		ApiResponse({
			description: '멤버 커버 이미지 업로드',
			isArray: true,
			type: String,
		}),
		ApiBadRequestResponse({
			description: ERROR_FILE_NOT_FOUND,
		}),
	);
};

export const PostUploadFeedMediasSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 미디어 업로드',
		}),
		ApiBody({
			schema: {
				type: 'object',
				properties: {
					files: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		}),
		ApiConsumes('multipart/form-data'),
		ApiResponse({
			description: '피드 미디어 업로드',
			isArray: true,
			type: String,
		}),
		ApiBadRequestResponse({
			description: ERROR_FILE_NOT_FOUND,
		}),
	);
};

export const PatchScheduleUploadThumbnailImageSwagger = () => {
	return applyDecorators(
		ApiConsumes('multipart/form-data'),
		ApiBody({
			schema: {
				type: 'object',
				properties: {
					files: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		}),
		ApiOperation({
			summary: '특정 스케줄 썸네일 수정하기',
		}),
		ApiResponse({
			description: '스케줄 썸네일 수정하기 성공',
			isArray: true,
			type: String,
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_SCHEDULE_NOT_FOUND} \n2. ${ERROR_FILE_NOT_FOUND}`,
		}),
	);
};

export const PatchGroupUploadCoverImageSwagger = () => {
	return applyDecorators(
		ApiConsumes('multipart/form-data'),
		ApiBody({
			schema: {
				type: 'object',
				properties: {
					files: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		}),
		ApiOperation({
			summary: '특정 그룹 커버 이미지 변경',
		}),
		ApiResponse({
			description: '특정 그룹 커버 이미지 변경 성공',
			isArray: true,
			type: String,
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_GROUP_NOT_FOUND} \n2. ${ERROR_UUID_PIPE_MESSAGE} \n3. ${ERROR_NO_PERMISSTION_TO_GROUP} \n4. ${ERROR_FILE_NOT_FOUND}`,
		}),
	);
};
