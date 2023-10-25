import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_FEED_NOT_FOUND,
} from '@/constants/business-error';
import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
} from '@nestjs/swagger';

export const CreateCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 생성',
		}),
		ApiCreatedResponse({
			description: '댓글 생성 성공',
		}),
		ApiNotFoundResponse({
			description: ERROR_FEED_NOT_FOUND,
		}),
	);
};

export const UpdateCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 수정',
		}),
		ApiCreatedResponse({
			description: '댓글 수정 성공',
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_FEED_NOT_FOUND} \n2. ${ERROR_COMMENT_NOT_FOUND}`,
		}),
	);
};
