import { UpdateProfileRequest } from '@/components/ui/modal/layer-modal/layer/EditProfile/edit-profile.interface';
import {
	AuthResponse,
	EmailVerifyRequest,
	RegisterRequest,
	SignInRequest,
	SocialRegisterRequest,
} from '@/shared/interfaces/auth.interface';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import { axiosAPI, axiosClassic } from 'api/axios';

export const AuthService = {
	async getAuthMember() {
		const { data } = await axiosAPI.get<SearchMemberResponse>('/auth/me');
		return data;
	},

	async signIn(email: string, password: string) {
		const { data } = await axiosClassic.post<AuthResponse>('/auth/sign-in', {
			email,
			password,
		} satisfies SignInRequest);
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
		} satisfies RegisterRequest);

		return data;
	},

	async socialRegister(requestData: UpdateProfileRequest) {
		const { memberId: id, ...rest } = requestData;

		const { data } = await axiosClassic.patch<void>('/auth/social/sign-up', {
			id,
			...rest,
		} satisfies SocialRegisterRequest);

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
				email,
			} satisfies EmailVerifyRequest,
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
