import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { CreateMemberSwagger } from '@/common/decorators/swagger/swagger-member.decorator';
import { MemberCreateReqDto } from '@/dto/member/req/member-create-req.dto';
import { MembersService } from '../members/members.service';
import { AuthService } from './auth.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly membersService: MembersService,
		private readonly authService: AuthService,
	) {}

	/**
	 * @summary Local 로그인을 위한 User 생성
	 *
	 * @tag auth
	 * @param MemberCreateReqDto 유저를 생성하기 위해 필요한 최소한의 값 정의
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 유저이름
	 */
	@CreateMemberSwagger()
	@Post('sign-up')
	async createMember(@Body() dto: MemberCreateReqDto) {
		return await this.authService.createMember(dto);
	}
}
