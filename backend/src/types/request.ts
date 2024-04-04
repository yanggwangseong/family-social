import { Request } from 'express';

interface GoogleAuthenticateUser {
	email: string;
	photo: string;
	firstName: string;
	lastName: string;
}

export interface GoogleOAuth2Request extends Request {
	googleAuthUser: GoogleAuthenticateUser;
}
