import { AuthResponse } from '@/shared/interfaces/auth.interface';
import { axiosClassic } from 'api/axios';

export const AuthService = {
	async register(email: string, password: string, username: string) {
		const { data } = await axiosClassic.post<AuthResponse>('/auth/sign-up', {
			email,
			password,
			username,
		});

		return data;
	},

	async emailVerify(emailVerifyCode: string, email: string) {
		const { data } = await axiosClassic.post<AuthResponse>(
			'/auth/email-verify',
			{
				signupVerifyToken: emailVerifyCode,
				email: email,
			},
		);

		return data;
	},
};
