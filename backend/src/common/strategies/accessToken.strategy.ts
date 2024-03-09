import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ENV_JWT_ACCESS_TOKEN_SECRET } from '@/constants/env-keys.const';
import { TokenPayload } from '@/types/token';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>(ENV_JWT_ACCESS_TOKEN_SECRET),
		});
	}

	validate(payload: TokenPayload) {
		return payload;
	}
}
