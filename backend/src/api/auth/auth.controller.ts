import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ApiTags } from '@nestjs/swagger';
import {
	CreateMemberSwagger,
	LoginMemberSwagger,
	VerifyEmailSwagger,
} from '@/common/decorators/swagger/swagger-member.decorator';
import { MemberCreateReqDto } from '@/dto/member/req/member-create-req.dto';
import { MembersService } from '../members/members.service';
import { AuthService } from './auth.service';
import { VerifyEmailReqDto } from '@/dto/member/req/verify-email-req.dto';
import { MemberLoginReqDto } from '@/dto/member/req/member-login-req.dto';
import { Response } from 'express';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly membersService: MembersService,
		private readonly authService: AuthService,
	) {}

	/**
	 * @summary Local User 로그인
	 *
	 * @tag auth
	 * @param email string
	 * @param password string
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 토큰
	 */
	@LoginMemberSwagger()
	@Post('sign-in')
	async signInUser(
		@Body() dto: MemberLoginReqDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const [accessToken, refreshToken] = await this.authService.signInUser(dto);
		this.authService.ResponseTokenInCookie({
			type: 'accessToken',
			token: accessToken,
			res,
		});
		this.authService.ResponseTokenInCookie({
			type: 'refreshToken',
			token: refreshToken,
			res,
		});
	}

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

	/**
	 * @summary Local User 생성 확인을 위한 email 검즘
	 *
	 * @tag auth
	 * @param VerifyEmailReqDto 이메일 검증 하기 위해 필요한 최소한의 값 정의
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 유저이름
	 */
	@VerifyEmailSwagger()
	@Post('email-verify')
	async verifyEmail(@Body() dto: VerifyEmailReqDto) {
		return await this.authService.verifyEmail(dto);
	}
}
