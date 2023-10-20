import {
	ERROR_DELETE_FEED_OR_MEDIA,
	ERROR_FEED_NOT_FOUND,
	ERROR_FILE_DIR_NOT_FOUND,
} from '@/constants/business-error';
import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedDetailResDto } from '@/models/dto/feed/res/feed-detail-res.dto';
import { FeedGetAllResDto } from '@/models/dto/feed/res/feed-get-all-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
} from '@nestjs/swagger';

export const GetFeedDetailSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '단일 피드 가져오기',
		}),
		ApiCreatedResponse({
			description: '피드 조회 성공',
			type: FeedDetailResDto,
		}),
		ApiNotFoundResponse({
			description: ERROR_FEED_NOT_FOUND,
		}),
	);
};

export const GetFeedsSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 가져오기',
		}),
		ApiCreatedResponse({
			description: '피드 조회 성공',
			type: FeedGetAllResDto,
		}),
	);
};

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
		ApiNotFoundResponse({
			description: ERROR_FEED_NOT_FOUND,
		}),
	);
};

export const LikesFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 좋아요',
		}),
		ApiCreatedResponse({
			description: '피드 좋아요',
			type: Boolean,
		}),
		ApiNotFoundResponse({
			description: ERROR_FEED_NOT_FOUND,
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
			description: `1. ${ERROR_FEED_NOT_FOUND} \n2. ${ERROR_FILE_DIR_NOT_FOUND}`,
		}),
	);
};
