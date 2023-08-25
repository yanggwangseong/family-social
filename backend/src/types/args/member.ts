export interface ILoginMemberArgs
	extends Pick<ICreateMemberArgs, 'email' | 'password'> {}

export interface ICreateMemberArgs {
	email: string;
	username: string;
	password?: string;
	phoneNumber: string;
}

export interface IVerifyEmailArgs extends Pick<ICreateMemberArgs, 'email'> {
	signupVerifyToken: string;
}
