export interface EditProfileFields {
	phoneNumber: string;
	username: string;
}

export interface UpdateProfileRequest extends EditProfileFields {
	memberId: string;
	profileImage: string;
}
