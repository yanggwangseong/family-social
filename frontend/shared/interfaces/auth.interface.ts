export interface AuthResponse {
	id: string;
	username: string;
}

export interface EmailVerifyType {
	emailVerifyCode: string;
}

export interface SignInRequest {
	email: string;
	password: string;
}

export interface RegisterRequest extends SignInRequest {
	username: string;
	phoneNumber: string;
}

export interface SocialRegisterRequest {
	id: string;
	profileImage: string;
	phoneNumber: string;
	username: string;
}

export interface EmailVerifyRequest {
	signupVerifyToken: string;
	email: string;
}
