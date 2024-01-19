import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_DELETE_COMMENT,
	ERROR_FEED_NOT_FOUND,
} from '@/constants/business-error';

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

export const DeleteCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 삭제',
		}),
		ApiCreatedResponse({
			description: '댓글 삭제 성공',
		}),
		ApiNotFoundResponse({
			description: `1. ${ERROR_FEED_NOT_FOUND} \n2. ${ERROR_COMMENT_NOT_FOUND}`,
		}),
		ApiConflictResponse({
			description: ERROR_DELETE_COMMENT,
		}),
	);
};

export const LikesCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 좋아요',
		}),
		ApiCreatedResponse({
			description: '댓글 좋아요',
			type: Boolean,
		}),
		ApiNotFoundResponse({
			description: ERROR_COMMENT_NOT_FOUND,
		}),
	);
};
