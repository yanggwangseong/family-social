import {
	ERROR_DELETE_FEED_OR_MEDIA,
	ERROR_FILE_DIR_NOT_FOUND,
} from '@/constants/business-error';
import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
} from '@nestjs/swagger';

export const CreateFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 생성',
		}),
		ApiCreatedResponse({
			description: '피드 생성 성공',
			type: FeedByIdResDto,
		}),
	);
};

export const UpdateFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 수정',
		}),
		ApiCreatedResponse({
			description: '피드 수정 성공',
		}),
	);
};

export const DeleteFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 삭제',
		}),
		ApiCreatedResponse({
			description: '피드 삭제 성공',
		}),
		ApiConflictResponse({
			description: ERROR_DELETE_FEED_OR_MEDIA,
		}),
		ApiNotFoundResponse({
			description: ERROR_FILE_DIR_NOT_FOUND,
		}),
	);
};
