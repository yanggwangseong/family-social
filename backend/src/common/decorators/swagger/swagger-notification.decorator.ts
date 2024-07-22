import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

import { NotificationResDto } from '@/models/dto/notification/res/notification.res.dto';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { isReadOptions } from '@/types';

import { PagiNationQuerySwagger } from './query/swagger-pagination-query';
import { SuccessResponse } from './sucess-response.decorator';

export const GetNotificationListSwagger = () => {
	return applyDecorators(
		PagiNationQuerySwagger(),
		ApiQuery({
			name: 'is_read_options',
			enum: isReadOptions,
			required: true,
			description: '알람 읽음 상태',
		}),
		ApiOperation({
			summary: '자신에게 온 알람을 가져오기',
		}),
		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(NotificationResDto),
				exampleTitle: '알람 리스트',
				exampleDescription: '자신에게 온 알람을 가져오기',
			},
		]),
	);
};
