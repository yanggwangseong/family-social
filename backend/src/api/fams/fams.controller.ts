import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FamsService } from './fams.service';
import { GetInvitationsListSwagger } from '@/common/decorators/swagger/swagger-fam.decorator';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('fams')
@Controller('fams')
export class FamsController {
	constructor(private readonly famsService: FamsService) {}

	/**
	 * @summary 수락하지 않은 팸 초대 리스트를 조회
	 *
	 * @tag fams
	 * @param sub 인증된 유저 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 팸 초대 리스트, 총 갯수
	 */
	@GetInvitationsListSwagger()
	@Get('/invitations')
	async getInvitationsList(@CurrentUser('sub') sub: string) {
		return this.famsService.getInvitationsList({
			memberId: sub,
		});
	}
}
