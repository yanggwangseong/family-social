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
};
