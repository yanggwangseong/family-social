import { TokenPayload } from '@/types/token';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

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
			secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: TokenPayload) {
		if (!req.cookies.Authentication) throw new UnauthorizedException();

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
