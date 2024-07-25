import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
	constructor() {
		super({
			clientID: process.env.KAKAO_CLIENT_ID,
			clientSecret: process.env.KAKAO_SECRET,
			callbackURL: process.env.KAKAO_CALLBACK_URL,
			scope: ['account_email', 'profile_nickname'],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		const { username, _json } = profile;

		const { profile_image } = _json['properties'];
		const { email } = _json['kakao_account'];

		const user = {
			email: email ? email : '',
			photo: profile_image ? profile_image : '',
			username: username ? username : '',
			accessToken,
			refreshToken,
		};

		return user;
	}
}
