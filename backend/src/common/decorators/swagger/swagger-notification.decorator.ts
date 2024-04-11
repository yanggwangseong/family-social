import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { NotificationResDto } from '@/models/dto/notification/res/notification.res.dto';

export const GetNotificationListSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '자신에게 온 알람을 가져오기',
		}),
		ApiOkResponse({
			description: '자신에게 온 알람을 가져오기',
			type: NotificationResDto,
		}),
	);
};
