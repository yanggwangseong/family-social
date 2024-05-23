import { Controller, Sse, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';

import { ServerSentEventsService } from './server-sent-events.service';

@UseInterceptors(LoggingInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('sse')
@Controller('sse')
export class ServerSentEventsController {
	constructor(
		private readonly serverSentEventsService: ServerSentEventsService,
	) {}

	@Sse('/notifications')
	SubscribeNotifications(@CurrentUser('sub') sub: string) {
		return this.serverSentEventsService.SubscribeNotifications(sub);
	}
}
