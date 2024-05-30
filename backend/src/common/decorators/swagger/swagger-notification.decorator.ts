import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { NotificationResDto } from '@/models/dto/notification/res/notification.res.dto';
import { isReadOptions } from '@/types';

import { PagiNationQuerySwagger } from './query/swagger-pagination-query';

export const GetNotificationListSwagger = () => {
	return applyDecorators(
		PagiNationQuerySwagger(),
		ApiQuery({
			name: 'is_read_options',
			enum: isReadOptions,
			required: false,
			description: 'Read status options',
		}),
		ApiOperation({
			summary: '자신에게 온 알람을 가져오기',
		}),
		ApiOkResponse({
			description: '자신에게 온 알람을 가져오기',
			type: NotificationResDto,
		}),
	);
};
