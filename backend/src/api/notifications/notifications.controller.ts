import {
	Controller,
	Get,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IsPagination } from '@/common/decorators/is-pagination.decorator';
import { GetNotificationListSwagger } from '@/common/decorators/swagger/swagger-notification.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { PaginationEnum } from '@/constants/pagination.const';
import { NotificationPaginationReqDto } from '@/models/dto/notification/req/notification-pagination-req.dto';
import { NotificationPaginateResDto } from '@/models/dto/notification/res/notification-paginate-res.dto';
import { NotificationEntity } from '@/models/entities/notification.entity';

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
	@UseInterceptors(PaginationInterceptor<NotificationEntity>)
	@IsPagination(PaginationEnum.BASIC)
	@Get()
	async getNotification(
		@CurrentUser('sub') sub: string,
		// @Query(
		// 	'page',
		// 	new DefaultValuePipe(1),
		// 	new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		// )
		// page: number,

		// @Query(
		// 	'limit',
		// 	new DefaultValuePipe(10),
		// 	new ParseIntPipe({
		// 		exceptionFactory: () => parseIntPipeMessage('limit'),
		// 	}),
		// )
		// limit: number,

		// @Query('is_read_options', new ParseIsReadOptionsPipe())
		// is_read_options: Union<typeof isReadOptions>,
		@Query() paginationDto: NotificationPaginationReqDto,
	) {
		return await this.notificationsService.getNotificationByMemberId(
			sub,
			paginationDto,
		);
	}
}
