import { AuthResponse } from '@/shared/interfaces/auth.interface';
import { axiosAPI, axiosClassic } from 'api/axios';

export const AuthService = {
	async signIn(email: string, password: string) {
		const { data } = await axiosClassic.post<AuthResponse>('/auth/sign-in', {
			email,
			password,
		});
	},

	async register(
		email: string,
		password: string,
		username: string,
		phoneNumber: string,
	) {
		const { data } = await axiosClassic.post<AuthResponse>('/auth/sign-up', {
			email,
			password,
			username,
			phoneNumber,
		});

		return data;
	},

	async logout() {
		const { data } = await axiosAPI.post('/auth/logout');
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

	async uploadfile(img: File[]) {
		const formData = new FormData();

		for (const file of img) {
			formData.append('files', file);
		}

		const { data } = await axiosAPI.post<AuthResponse>(
			'/feeds/test',
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			},
		);

		return data;
	},
};
