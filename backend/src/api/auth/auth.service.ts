import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { Injectable } from '@nestjs/common';
import {
	ICreateMemberArgs,
	ILoginMemberArgs,
	IVerifyEmailArgs,
} from '@/types/args/member';
import { MemberResDto } from '@/dto/member/res/member-res.dto';
import * as bcrypt from 'bcryptjs';
import { MembersRepository } from '../members/members.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { generateRandomCode } from '@/utils/generate-random-code';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenInCookieArgs } from '@/types/args/auth';
import { CookieOptions } from 'express';
import { IRefreshTokenArgs } from '@/types/token';

@Injectable()
export class AuthService {
	constructor(
		private readonly membersRepository: MembersRepository,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signInUser(dto: ILoginMemberArgs) {
		const member = await this.membersRepository.signInUser(dto);

		if (!member)
			throw EntityNotFoundException(
				'이메일에 해당하는 유저를 찾을 수 없습니다',
			);
		const passwordMatches = await this.CompareHashData<string>(
			dto.password!,
			member.password!,
		);
		if (!passwordMatches)
			throw EntityConflictException('비밀번호가 일치 하지 않습니다.');

		const [accessToken, refreshToken] = await this.signatureTokens(
			member.id,
			member.username,
		);

		await this.setCurrentRefreshToken(member.id, refreshToken);

		return [accessToken, refreshToken];
	}

	async refreshTokens({
		sub,
		username,
		refreshToken: refreshTokenArgs,
	}: IRefreshTokenArgs) {
		const member = await this.membersRepository.findRefreshTokenById({
			memberId: sub,
		});
		if (!member) throw EntityNotFoundException('유저를 찾을 수 없습니다.');

		const refreshTokenMatches = await this.CompareHashData<string>(
			refreshTokenArgs,
			member.refreshToken!,
		);

		if (!refreshTokenMatches)
			throw EntityConflictException('토큰 정보가 일치 하지 않습니다.');

		const [accessToken, refreshToken] = await this.signatureTokens(
			sub,
			username,
		);

		await this.setCurrentRefreshToken(sub, refreshToken);

		return [accessToken, refreshToken];
	}

	async createMember(dto: ICreateMemberArgs): Promise<MemberResDto> {
		const member = await this.membersRepository.findMemberByEmail({
			email: dto.email,
		});
		if (member)
			throw EntityConflictException(
				'해당 이메일에 해당하는 유저가 존재 합니다.',
			);

		const signupVerifyToken = generateRandomCode(10);
		const newMember = await this.membersRepository.createMember(
			{
				...dto,
				password: await this.EncryptHashData<string>(dto.password!),
			},
			await this.EncryptHashData<string>(signupVerifyToken),
		);
		if (!newMember)
			throw EntityNotFoundException('생성한 유저를 찾을 수 없습니다.');

		//유저 생성 성공 후 email 인증코드 전송.
		await this.sendSignUpEmailVerify(dto.email, signupVerifyToken);

		return newMember;
	}

	async verifyEmail(dto: IVerifyEmailArgs) {
		const memberByEmail =
			await this.membersRepository.findsignupVerifyTokenByEmail({
				email: dto.email,
			});

		if (!memberByEmail)
			throw EntityNotFoundException(
				'이메일에 해당하는 유저를 찾을 수 없습니다',
			);

		const verifyEmailMatches = await this.CompareHashData<string>(
			dto.signupVerifyToken,
			memberByEmail.signupVerifyToken!,
		);
		if (!verifyEmailMatches)
			throw EntityConflictException('이메일 검증 코드가 일치 하지 않습니다.');
		return memberByEmail;
	}

	private async sendSignUpEmailVerify(
		email: string,
		signupVerifyToken: string,
	) {
		try {
			await this.mailerService.sendMail({
				to: email,
				subject: '이메일 인증',
				text: '이메일 인증',
				html: `<!DOCTYPE html>
				<html lang="ko">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>이메일 인증</title>
				</head>
				<body
					style='font-family: Arial, sans-serif;
						   margin: 0;
						   padding: 0;
						   background-color: #f4f4f4;
						   text-align: center;'
					>
					<div
						style='padding: 20px;
							   background-color: #ffffff;
							   border-radius: 5px;
							   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'
						>
						<h1>이메일 인증</h1>
						<p style='margin-bottom:30px;'>가입해 주셔서 감사합니다! 아래의 인증 코드를 사용하세요:</p>
						<p
							style='font-size: 24px;
								   font-weight: bold;
								   color: #007bff;'
							>${signupVerifyToken}</p>
						<p style='margin-top:30px;'>이 코드를 인증 페이지에서 입력하여 가입을 완료하세요.</p>
						<p>만약 이 서비스에 가입하지 않으셨다면 이 이메일을 무시하셔도 됩니다.</p>
						<p>감사합니다.</p>
					</div>
				</body>
				</html>
				`,
			});
		} catch (error: any) {
			throw Error(error);
		}
	}

	private async EncryptHashData<T extends string = string>(data: T) {
		const salt = await bcrypt.genSalt(10);

		const hashData = await bcrypt.hash(data, salt);
		return hashData;
	}

	private async CompareHashData<T extends string = string>(
		userInput: T,
		storedHash: T,
	) {
		const compare = await bcrypt.compare(userInput, storedHash);
		return compare;
	}

	private async signatureTokens(
		id: string,
		name: string,
	): Promise<[string, string]> {
		const [accessToken, refreshToken]: [string, string] = await Promise.all([
			await this.jwtService.signAsync(
				{
					sub: id,
					username: name,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
					expiresIn: this.configService.get<string>(
						'JWT_ACCESS_TOKEN_EXPIRATION',
					),
				},
			),
			await this.jwtService.signAsync(
				{
					sub: id,
					username: name,
				},
				{
					secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
					expiresIn: this.configService.get<string>(
						'JWT_REFRESH_TOKEN_EXPIRATION',
					),
				},
			),
		]);

		return [accessToken, refreshToken];
	}

	private async setCurrentRefreshToken(id: string, refreshToken: string) {
		const currentHashedRefreshToken = await this.EncryptHashData(refreshToken);
		await this.membersRepository.updateRefreshToken({
			memberId: id,
			refreshToken: currentHashedRefreshToken,
		});
	}

	ResponseTokenInCookie({ type, token, res }: ITokenInCookieArgs) {
		const accessTokenCookieName = this.configService.get<string>(
			'ACCESS_TOKEN_COOKIE_NAME',
		);
		const refreshTokenCookieName = this.configService.get<string>(
			'REFRESH_TOKEN_COOKIE_NAME',
		);

		const tokenName =
			type === 'refreshToken'
				? refreshTokenCookieName!
				: accessTokenCookieName!;
		let cookieOptions: CookieOptions = {
			maxAge: Number(this.configService.get<number>('COOKIE_MAX_AGE')),
		};

		if (type === 'refreshToken') {
			cookieOptions = {
				...cookieOptions,
				httpOnly: true,
			};
		}

		res.cookie(tokenName, token, cookieOptions);
	}
}
