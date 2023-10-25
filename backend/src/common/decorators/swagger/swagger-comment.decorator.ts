import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export const CreateCommentSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '댓글 생성',
		}),
		ApiCreatedResponse({
			description: '댓글 생성 성공',
		}),
	);
};
