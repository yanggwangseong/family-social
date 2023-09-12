import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FamsService } from './fams.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('fams')
@Controller('fams')
export class FamsController {
	constructor(private readonly famsService: FamsService) {}

	@Get('/invitations')
	async getInvitationsList(@CurrentUser('sub') sub: string) {
		return this.famsService.getInvitationsList({
			memberId: sub,
		});
	}
}
