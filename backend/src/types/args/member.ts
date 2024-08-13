export interface ILoginMemberArgs
	extends Pick<ICreateMemberArgs, 'email' | 'password'> {}

export interface ICreateMemberArgs {
	email: string;
	username: string;
	password?: string;
	phoneNumber: string;
}

export interface ICreateSocialMemberArgs extends ICreateMemberArgs {
	profileImage: string;
	socialType: 'google' | 'naver' | 'kakao';
}

export interface IVerifyEmailArgs extends Pick<ICreateMemberArgs, 'email'> {
	signupVerifyToken: string;
}

export interface IUpdateMemberArgs {
	memberId: string;
	username: string;
	phoneNumber: string;
	profileImage: string;
}
