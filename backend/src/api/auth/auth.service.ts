import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CookieOptions, Response } from 'express';
import { QueryRunner } from 'typeorm';

import {
	EntityConflictException,
	EntityNotFoundException,
	UnAuthOrizedException,
	UnProcessAbleException,
} from '@/common/exception/service.exception';
import {
	ERROR_PASSWORD_MISMATCH,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_USER_NOT_FOUND,
	ERROR_TOKEN_MISMATCH,
	ERROR_USER_ALREADY_EXISTS,
	ERROR_EMAIL_VERIFY_CODE_EXISTS,
} from '@/constants/business-error';
import {
	ENV_ACCESS_TOKEN_COOKIE_NAME,
	ENV_COOKIE_MAX_AGE,
	ENV_JWT_ACCESS_TOKEN_EXPIRATION,
	ENV_JWT_ACCESS_TOKEN_SECRET,
	ENV_JWT_REFRESH_TOKEN_EXPIRATION,
	ENV_JWT_REFRESH_TOKEN_SECRET,
	ENV_REFRESH_TOKEN_COOKIE_NAME,
} from '@/constants/env-keys.const';
import { MemberResDto } from '@/models/dto/member/res/member-res.dto';
import { VerifyEmailResDto } from '@/models/dto/member/res/verify-email-res.dto';
import { MembersRepository } from '@/models/repositories/members.repository';
import { ITokenInCookieArgs } from '@/types/args/auth';
import {
	ICreateMemberArgs,
	ILoginMemberArgs,
	IVerifyEmailArgs,
} from '@/types/args/member';
import { IRefreshTokenArgs } from '@/types/token';
import { generateRandomCode } from '@/utils/generate-random-code';

@Injectable()
export class AuthService {
	constructor(
		private readonly membersRepository: MembersRepository,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signInUser(dto: ILoginMemberArgs): Promise<string[]> {
		const member = await this.membersRepository.signInUser(dto);

		if (!member) throw EntityNotFoundException(ERROR_EMAIL_NOT_FOUND);

		const passwordMatches = await this.CompareHashData<string>(
			dto.password!,
			member.password!,
		);
		if (!passwordMatches) throw UnAuthOrizedException(ERROR_PASSWORD_MISMATCH);

		const [accessToken, refreshToken] = await this.signatureTokens(
			member.id,
			member.username,
		);

		await this.setCurrentRefreshToken(member.id, refreshToken);

		return [accessToken, refreshToken];
	}

	async clearCookieAndResetRefreshToken(
		res: Response,
		sub: string,
	): Promise<void> {
		const accessTokenCookieName = this.configService.get<string>(
			ENV_ACCESS_TOKEN_COOKIE_NAME,
		);
		const refreshTokenCookieName = this.configService.get<string>(
			ENV_REFRESH_TOKEN_COOKIE_NAME,
		);

		res.clearCookie(accessTokenCookieName!);
		res.clearCookie(refreshTokenCookieName!);

		await this.setCurrentRefreshToken(sub, '');
	}

	async refreshTokens({
		sub,
		username,
		refreshToken: refreshTokenArgs,
	}: IRefreshTokenArgs): Promise<string[]> {
		const member = await this.membersRepository.findRefreshTokenById({
			memberId: sub,
		});
		if (!member) throw EntityNotFoundException(ERROR_USER_NOT_FOUND);

		const refreshTokenMatches = await this.CompareHashData<string>(
			refreshTokenArgs,
			member.refreshToken!,
		);

		if (!refreshTokenMatches) throw UnAuthOrizedException(ERROR_TOKEN_MISMATCH);

		const [accessToken, refreshToken] = await this.signatureTokens(
			sub,
			username,
		);

		await this.setCurrentRefreshToken(sub, refreshToken);

		return [accessToken, refreshToken];
	}

	async createMember(
		dto: ICreateMemberArgs,
		qr?: QueryRunner,
	): Promise<{
		newMember: MemberResDto;
		email: string;
		signupVerifyToken: string;
	}> {
		const { email } = dto;

		const member = await this.membersRepository.findMemberByEmail({
			email,
		});
		if (member) throw EntityConflictException(ERROR_USER_ALREADY_EXISTS);

		const { newMember, signupVerifyToken } =
			await this.createMemberWithVerifyToken(dto, qr);

		return {
			newMember,
			email,
			signupVerifyToken,
		};
	}

	async createMemberWithVerifyToken(dto: ICreateMemberArgs, qr?: QueryRunner) {
		const { password } = dto;

		const signupVerifyToken = generateRandomCode(10);
		const newMember = await this.membersRepository.createMember(
			{
				...dto,
				password: await this.EncryptHashData<string>(
					password ?? signupVerifyToken,
				),
			},
			await this.EncryptHashData<string>(signupVerifyToken),
			qr,
		);

		if (!newMember) throw EntityNotFoundException(ERROR_USER_NOT_FOUND);

		return {
			newMember,
			signupVerifyToken,
		};
	}

	async verifyEmail({
		email,
		signupVerifyToken,
	}: IVerifyEmailArgs): Promise<VerifyEmailResDto> {
		const memberByEmail =
			await this.membersRepository.findsignupVerifyTokenByEmail({
				email,
			});

		if (!memberByEmail) throw EntityNotFoundException(ERROR_EMAIL_NOT_FOUND);

		const verifyEmailMatches = await this.CompareHashData<string>(
			signupVerifyToken,
			memberByEmail.signupVerifyToken!,
		);
		if (!verifyEmailMatches)
			throw UnProcessAbleException(ERROR_EMAIL_VERIFY_CODE_EXISTS);
		return memberByEmail;
	}

	private async EncryptHashData<T extends string = string>(
		data: T,
	): Promise<string> {
		const salt = await bcrypt.genSalt(10);

		const hashData = await bcrypt.hash(data, salt);
		return hashData;
	}

	private async CompareHashData<T extends string = string>(
		userInput: T,
		storedHash: T,
	): Promise<boolean> {
		const compare = await bcrypt.compare(userInput, storedHash);
		return compare;
	}

	async signatureTokens(id: string, name: string): Promise<[string, string]> {
		const [accessToken, refreshToken]: [string, string] = await Promise.all([
			await this.jwtService.signAsync(
				{
					sub: id,
					username: name,
				},
				{
					secret: this.configService.get<string>(ENV_JWT_ACCESS_TOKEN_SECRET),
					expiresIn: this.configService.get<string>(
						ENV_JWT_ACCESS_TOKEN_EXPIRATION,
					),
				},
			),
			await this.jwtService.signAsync(
				{
					sub: id,
					username: name,
				},
				{
					secret: this.configService.get<string>(ENV_JWT_REFRESH_TOKEN_SECRET),
					expiresIn: this.configService.get<string>(
						ENV_JWT_REFRESH_TOKEN_EXPIRATION,
					),
				},
			),
		]);

		return [accessToken, refreshToken];
	}

	async setCurrentRefreshToken(
		id: string,
		refreshToken: string,
	): Promise<void> {
		const currentHashedRefreshToken = refreshToken
			? await this.EncryptHashData(refreshToken)
			: '';
		await this.membersRepository.updateRefreshToken({
			memberId: id,
			refreshToken: currentHashedRefreshToken,
		});
	}

	ResponseTokenInCookie({ type, token, res }: ITokenInCookieArgs): void {
		const accessTokenCookieName = this.configService.get<string>(
			ENV_ACCESS_TOKEN_COOKIE_NAME,
		);
		const refreshTokenCookieName = this.configService.get<string>(
			ENV_REFRESH_TOKEN_COOKIE_NAME,
		);

		const tokenName =
			type === 'refreshToken'
				? refreshTokenCookieName!
				: accessTokenCookieName!;
		let cookieOptions: CookieOptions = {
			maxAge: Number(this.configService.get<number>(ENV_COOKIE_MAX_AGE)),
		};

		if (type === 'refreshToken') {
			cookieOptions = {
				...cookieOptions,
				httpOnly: true,
			};
		}

		res.cookie(tokenName, token, cookieOptions);
	}

	extractTokenFromHeader(header: string, isBearer: boolean) {
		const splitToken = header.split(' ');

		const prefix = isBearer ? 'Bearer' : 'Basic';

		if (splitToken.length !== 2 || splitToken[0] !== prefix) {
			throw UnAuthOrizedException(ERROR_TOKEN_MISMATCH);
		}

		const token = splitToken[1];

		return token;
	}

	verifyToken(token: string) {
		try {
			return this.jwtService.verify(token, {
				secret: this.configService.get<string>(ENV_JWT_ACCESS_TOKEN_SECRET),
			});
		} catch (error) {
			throw UnAuthOrizedException(ERROR_TOKEN_MISMATCH);
		}
	}
}
