import { Request } from 'express';

interface GoogleAuthenticateUser {
	email: string;
	photo: string;
	firstName: string;
	lastName: string;
}

interface NaverAuthenticateUser {
	email: string;
	photo: string;
	username: string;
}

interface KakaoAuthenticateUser {
	email: string;
	photo: string;
	username: string;
}

export interface GoogleOAuth2Request extends Request {
	user: GoogleAuthenticateUser;
}

export interface NaverOAuth2Request extends Request {
	user: NaverAuthenticateUser;
}

export interface KakaoOAuth2Request extends Request {
	user: KakaoAuthenticateUser;
}
