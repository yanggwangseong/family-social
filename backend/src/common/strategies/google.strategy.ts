import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
	Strategy as GStrategy,
	Profile,
	VerifyCallback,
} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(GStrategy, 'google') {
	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		const { name, emails, photos } = profile;
		const user = {
			email: emails ? emails[0].value : '',
			photo: photos ? photos[0].value : '',
			firstName: name ? name.givenName : '',
			lastName: name ? name.familyName : '',
			accessToken,
			refreshToken,
		};
		done(null, user);
	}
}
