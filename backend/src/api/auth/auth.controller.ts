import {
	Body,
	Controller,
	Post,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
	CreateMemberSwagger,
	LoginMemberSwagger,
	VerifyEmailSwagger,
} from '@/common/decorators/swagger/swagger-member.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { RefreshTokenGuard } from '@/common/guards/refreshToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { MemberCreateReqDto } from '@/models/dto/member/req/member-create-req.dto';
import { MemberLoginReqDto } from '@/models/dto/member/req/member-login-req.dto';
import { VerifyEmailReqDto } from '@/models/dto/member/req/verify-email-req.dto';
import { IRefreshTokenArgs } from '@/types/token';

import { AuthService } from './auth.service';
import { MembersService } from '../members/members.service';

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
	 * @param {string} dto.email - 로그인을 위한 email
	 * @param {string} dto.password - 로그인을 위한 pw
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
	 * @param {string} dto.email - email
	 * @param {string} dto.username - 유저 이름
	 * @param {string} dto.password - 비밀번호
	 * @param {string} dto.phoneNumber - 휴대폰번호
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
	 * @param {string} dto.email 이메일 검증 하기 위해 필요한 email
	 * @param {string} dto.signupVerifyToken 이메일 검증 코드
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 유저이름
	 */
	@VerifyEmailSwagger()
	@Post('email-verify')
	async verifyEmail(@Body() dto: VerifyEmailReqDto) {
		return await this.authService.verifyEmail(dto);
	}

	/**
	 * @summary Local User 로그아웃
	 *
	 * @tag auth
	 * @param {string} sub - 인증된 유저Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 쿠키삭제, refreshtoken 값 초기화
	 */
	@UseGuards(AccessTokenGuard)
	@Post('/logout')
	async logout(
		@CurrentUser('sub') sub: string,
		@Res({ passthrough: true }) res: Response,
	) {
		await this.authService.clearCookieAndResetRefreshToken(res, sub);
	}

	/**
	 * @summary Local User refreshtoken 재발급 및 accesstoken 재발급
	 *
	 * @tag auth
	 * @param {string} user.username - 인증된 사용자의 username
	 * @param {string} user.sub - 인증된 사용자의 Id
	 * @param {string} user.refreshToken - 인증된 사용자의 refreshToken
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 토큰
	 */
	@UseGuards(RefreshTokenGuard)
	@Post('/refreshtoken')
	async refreshTokens(
		@CurrentUser()
		user: IRefreshTokenArgs,
		@Res({ passthrough: true }) res: Response,
	) {
		const [accessToken, refreshToken] = await this.authService.refreshTokens(
			user,
		);

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
}
