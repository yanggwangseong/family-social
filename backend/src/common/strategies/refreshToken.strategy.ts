import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ERROR_TOKEN_EXPIRED } from '@/constants/business-error';
import { ENV_JWT_REFRESH_TOKEN_SECRET } from '@/constants/env-keys.const';
import { TokenPayload } from '@/types/token';

import { UnAuthOrizedException } from '../exception/service.exception';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				RefreshTokenStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			secretOrKey: configService.get<string>(ENV_JWT_REFRESH_TOKEN_SECRET),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: TokenPayload) {
		if (!req.cookies.Authentication)
			throw UnAuthOrizedException(ERROR_TOKEN_EXPIRED);

		const refreshToken = req.cookies.Authentication;
		return { ...payload, refreshToken };
	}

	private static extractJWT(req: Request): string | null {
		if (req.cookies && 'Authentication' in req.cookies) {
			return req.cookies.Authentication;
		}
		return null;
	}
}
