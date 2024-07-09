import {
	Controller,
	Get,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IsPagination } from '@/common/decorators/is-pagination.decorator';
import { IsResponseDtoDecorator } from '@/common/decorators/is-response-dto.decorator';
import { PaginationDecorator } from '@/common/decorators/pagination.decorator';
import { GetNotificationListSwagger } from '@/common/decorators/swagger/swagger-notification.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { ResponseDtoInterceptor } from '@/common/interceptors/reponse-dto.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { Pagination } from '@/common/strategies/context/pagination';
import { PaginationEnum } from '@/constants/pagination.const';
import { NotificationPaginationReqDto } from '@/models/dto/notification/req/notification-pagination-req.dto';
import { NotificationResDto } from '@/models/dto/notification/res/notification.res.dto';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
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
	 * @returns 자신에게 온 알람 리스트
	 */
	@GetNotificationListSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof NotificationResDto>
		>,
		PaginationInterceptor<NotificationEntity>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(NotificationResDto))
	@Get()
	async getNotification(
		@CurrentUser('sub') sub: string,
		@Query() paginationDto: NotificationPaginationReqDto,
		@PaginationDecorator() pagination: Pagination<NotificationEntity>,
	) {
		return await this.notificationsService.getNotificationByMemberId(
			sub,
			paginationDto,
			pagination,
		);
	}
}
