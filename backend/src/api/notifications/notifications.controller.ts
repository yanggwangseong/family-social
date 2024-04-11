import {
	Controller,
	DefaultValuePipe,
	Get,
	ParseIntPipe,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetNotificationListSwagger } from '@/common/decorators/swagger/swagger-notification.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { parseIntPipeMessage } from '@/common/pipe-message/parse-int-pipe-message';
import { NotificationPaginateResDto } from '@/models/dto/notification/res/notification-paginate-res.dto';
import { Union, isReadOptions } from '@/types';

import { NotificationsService } from './notifications.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	/**
	 * @summary 자신에게 온 알람을 가져오기
	 *
	 * @tag feeds
	 * @param page 페이징을 위한 page 번호
	 * @param limit 가져올 갯수
	 * @param sub   인증된 사용자의 아이디
	 * @param is_read_status 'ALL', 'READ', 'NOTREAD'
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {Promise<NotificationPaginateResDto>} 자신에게 온 알람 리스트
	 */
	@GetNotificationListSwagger()
	@Get()
	async getNotification(
		@CurrentUser('sub') sub: string,
		@Query(
			'page',
			new DefaultValuePipe(1),
			new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		)
		page: number,

		@Query(
			'limit',
			new DefaultValuePipe(10),
			new ParseIntPipe({
				exceptionFactory: () => parseIntPipeMessage('limit'),
			}),
		)
		limit: number,

		@Query('is_read_options')
		is_read_options: Union<typeof isReadOptions>,
	): Promise<NotificationPaginateResDto> {
		return await this.notificationsService.getNotificationByMemberId({
			memberId: sub,
			readOptions: is_read_options,
			page,
			limit,
		});
	}
}
