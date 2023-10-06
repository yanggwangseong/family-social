import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

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
