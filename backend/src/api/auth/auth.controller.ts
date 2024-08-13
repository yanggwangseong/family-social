import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { QueryRunner } from 'typeorm';

import { QueryRunnerDecorator } from '@/common/decorators/query-runner.decorator';
import {
	CreateMemberSwagger,
	LoginMemberSwagger,
	PatchSocialSignUpMemberSwagger,
	VerifyEmailSwagger,
} from '@/common/decorators/swagger/swagger-member.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { GoogleGuard } from '@/common/guards/google.guard';
import { KakaoGuard } from '@/common/guards/kakao.guard';
import { NaverGuard } from '@/common/guards/naver.guard';
import { RefreshTokenGuard } from '@/common/guards/refreshToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { TransactionInterceptor } from '@/common/interceptors/transaction.interceptor';
import { MemberCreateReqDto } from '@/models/dto/member/req/member-create-req.dto';
import { MemberLoginReqDto } from '@/models/dto/member/req/member-login-req.dto';
import { MemberSocialCreateReqDto } from '@/models/dto/member/req/member-social-create-req.dto';
import { VerifyEmailReqDto } from '@/models/dto/member/req/verify-email-req.dto';
import { ICreateSocialMemberArgs } from '@/types/args/member';
import {
	GoogleOAuth2Request,
	KakaoOAuth2Request,
	NaverOAuth2Request,
} from '@/types/request';
import { IRefreshTokenArgs } from '@/types/token';

import { AuthService } from './auth.service';
import { MailsService } from '../mails/mails.service';
import { MembersService } from '../members/members.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly mailsService: MailsService,
		private readonly membersService: MembersService,
	) {}

	/**
	 * @summary Google Oauth2 로그인 요청 들어오는 api
	 *
	 * @tag auth
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@Get('/google/sign-in')
	@UseGuards(GoogleGuard)
	async googleOauth2Signin() {}

	/**
	 * @summary Google Oauth2 검증된 후 콜백 api
	 *
	 * @tag auth
	 * @param {GoogleOAuth2Request} req - 검증된 유저 정보를 가지고 있는 객체
	 * @param {Response} res
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 토큰
	 */
	@Get('/google/callback')
	@UseGuards(GoogleGuard)
	async googleOauth2CallBack(
		@Req() req: GoogleOAuth2Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const { email, photo, firstName, lastName } = req.user;

		const fullName = firstName + lastName;
		const Exists = await this.membersService.memberExistsByEmail(email);

		if (Exists) {
			const { id, username, isFirstLogin } = Exists;

			// 만약 생성 이력이 있는데 isFirstLogin이 비어있다면 추가정보를 입력하여 회원가입 과정을 완료 한게 아닌 상태
			if (!isFirstLogin) {
				res.redirect(`http://localhost:3000/signup/social?id=${id}`);
			}

			const [accessToken, refreshToken] =
				await this.authService.signatureTokens(id, username);

			await this.authService.setCurrentRefreshToken(id, refreshToken);

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

			res.redirect(`http://localhost:3000/oauth2/redirect`);
		} else {
			const tmpDto: ICreateSocialMemberArgs = {
				email,
				username: fullName,
				phoneNumber: '00000000000',
				profileImage: photo,
				socialType: 'google',
			};

			const tmpMember = await this.authService.createMemberWithVerifyToken(
				tmpDto,
			);

			res.redirect(
				`http://localhost:3000/signup/social?id=${tmpMember.newMember.id}`,
			);
		}
	}

	/**
	 * @summary Naver Oauth2 로그인 요청 들어오는 api
	 *
	 * @tag auth
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@Get('/naver/sign-in')
	@UseGuards(NaverGuard)
	async naverOauth2Signin() {}

	/**
	 * @summary Naver Oauth2 검증된 후 콜백 api
	 *
	 * @tag auth
	 * @param {NaverOAuth2Request} req - 검증된 유저 정보를 가지고 있는 객체
	 * @param {Response} res
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 토큰
	 */
	@Get('/naver/callback')
	@UseGuards(NaverGuard)
	async naverOauth2CallBack(
		@Req() req: NaverOAuth2Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const { email, photo, username } = req.user;

		const Exists = await this.membersService.memberExistsByEmail(email);

		if (Exists) {
			const { id, username, isFirstLogin } = Exists;

			// 만약 생성 이력이 있는데 isFirstLogin이 비어있다면 추가정보를 입력하여 회원가입 과정을 완료 한게 아닌 상태
			if (!isFirstLogin) {
				res.redirect(`http://localhost:3000/signup/social?id=${id}`);
			}

			const [accessToken, refreshToken] =
				await this.authService.signatureTokens(id, username);

			await this.authService.setCurrentRefreshToken(id, refreshToken);

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

			res.redirect(`http://localhost:3000/oauth2/redirect`);
		} else {
			const tmpDto: ICreateSocialMemberArgs = {
				email,
				username: username,
				phoneNumber: '00000000000',
				profileImage: photo,
				socialType: 'naver',
			};

			const tmpMember = await this.authService.createMemberWithVerifyToken(
				tmpDto,
			);

			res.redirect(
				`http://localhost:3000/signup/social?id=${tmpMember.newMember.id}`,
			);
		}
	}

	/**
	 * @summary Kakao Oauth2 로그인 요청 들어오는 api
	 *
	 * @tag auth
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@Get('/kakao/sign-in')
	@UseGuards(KakaoGuard)
	async kakaoOauth2Signin() {}

	/**
	 * @summary Kakao Oauth2 검증된 후 콜백 api
	 *
	 * @tag auth
	 * @param {KakaoOAuth2Request} req - 검증된 유저 정보를 가지고 있는 객체
	 * @param {Response} res
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 토큰
	 */
	@Get('/kakao/callback')
	@UseGuards(KakaoGuard)
	async kakaoOauth2CallBack(
		@Req() req: KakaoOAuth2Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const { email, photo, username } = req.user;

		const Exists = await this.membersService.memberExistsByEmail(email);

		if (Exists) {
			const { id, username, isFirstLogin } = Exists;

			// 만약 생성 이력이 있는데 isFirstLogin이 비어있다면 추가정보를 입력하여 회원가입 과정을 완료 한게 아닌 상태
			if (!isFirstLogin) {
				res.redirect(`http://localhost:3000/signup/social?id=${id}`);
			}

			const [accessToken, refreshToken] =
				await this.authService.signatureTokens(id, username);

			await this.authService.setCurrentRefreshToken(id, refreshToken);

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

			res.redirect(`http://localhost:3000/oauth2/redirect`);
		} else {
			const tmpDto: ICreateSocialMemberArgs = {
				email,
				username: username,
				phoneNumber: '00000000000',
				profileImage: photo,
				socialType: 'kakao',
			};

			const tmpMember = await this.authService.createMemberWithVerifyToken(
				tmpDto,
			);

			res.redirect(
				`http://localhost:3000/signup/social?id=${tmpMember.newMember.id}`,
			);
		}
	}

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
	@UseInterceptors(TransactionInterceptor)
	@Post('sign-up')
	async createMember(
		@Body() dto: MemberCreateReqDto,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const { newMember, email, signupVerifyToken } =
			await this.authService.createMember(dto, qr);

		//유저 생성 성공 후 email 인증코드 전송.
		await this.mailsService.sendSignUpEmailVerify(email, signupVerifyToken, qr);

		return newMember;
	}

	/**
	 * @summary 소셜 회원가입
	 *
	 * @tag auth
	 * @param {string} dto.id 멤버 아이디
	 * @param {string} dto.username 유저 이름
	 * @param {string} dto.profileImage 프로필 이미지
	 * @param {string} dto.phoneNumber - 휴대폰번호
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@PatchSocialSignUpMemberSwagger()
	@Patch('/social/sign-up')
	async patchSocialSignUpMember(@Body() dto: MemberSocialCreateReqDto) {
		const { id: memberId, ...rest } = dto;

		return await this.membersService.updateMemberProfile({
			memberId,
			...rest,
		});
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
