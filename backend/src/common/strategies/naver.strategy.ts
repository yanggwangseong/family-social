import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';

export interface NaverStrategyValidate {
	validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (error: any, user?: any, info?: any) => void,
	): void;
}

@Injectable()
export class NaverStrategy
	extends PassportStrategy(Strategy, 'naver')
	implements NaverStrategyValidate
{
	constructor() {
		super({
			clientID: process.env.NAVER_CLIENT_ID!,
			clientSecret: process.env.NAVER_SECRET!,
			callbackURL: process.env.NAVER_CALLBACK_URL!,
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		const { email, nickname, profile_image } = profile['_json'];

		const user = {
			email: email ? email : '',
			photo: profile_image ? profile_image : '',
			username: nickname ? nickname : '',
			accessToken,
			refreshToken,
		};

		return user;
	}
}
