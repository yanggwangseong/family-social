import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';

export type VerifyCallback = (error: any, user?: any, info?: any) => void;

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
	constructor() {
		super({
			clientID: process.env.NAVER_CLIENT_ID,
			clientSecret: process.env.NAVER_SECRET,
			callbackURL: process.env.NAVER_CALLBACK_URL,
		});
	}

	validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		const { email, nickname, profile_image } = profile._json;
		const user = {
			email: email ? email : '',
			photo: profile_image ? profile_image : '',
			username: nickname ? nickname : '',
			accessToken,
			refreshToken,
		};

		done(null, user);
	}
}
