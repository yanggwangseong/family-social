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
	ERROR_SCHEDULE_NOT_FOUND,
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

export const PostUploadCoverImageSwagger = () => {
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
