export interface ICreateMemberArgs {
	email: string;
	username: string;
	password?: string;
}

export interface IVerifyEmailArgs extends Pick<ICreateMemberArgs, 'email'> {
	signupVerifyToken: string;
}
