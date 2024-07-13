import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	CommentErrorResponse,
	FeedErrorResponse,
} from '@/constants/swagger-error-response';

import { ErrorResponse } from './error-response.decorator';

export const CreateCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 생성',
		}),
		ApiCreatedResponse({
			description: '댓글 생성 성공',
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [FeedErrorResponse['Feed-404-1']]),
	);
};

export const UpdateCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 수정',
		}),
		ApiOkResponse({
			description: '댓글 수정 성공',
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [
			FeedErrorResponse['Feed-404-1'],
			CommentErrorResponse['Comment-404-1'],
		]),
	);
};

export const DeleteCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 삭제',
		}),
		ApiOkResponse({
			description: '댓글 삭제 성공',
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			FeedErrorResponse['Feed-404-1'],
			CommentErrorResponse['Comment-404-1'],
		]),
		ErrorResponse(HttpStatus.CONFLICT, [CommentErrorResponse['Comment-409-1']]),
	);
};

export const LikesCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 좋아요',
		}),
		ApiOkResponse({
			description: '댓글 좋아요',
			type: Boolean,
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			FeedErrorResponse['Feed-404-1'],
			CommentErrorResponse['Comment-404-1'],
		]),
	);
};
