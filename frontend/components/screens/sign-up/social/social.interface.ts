import { AuthFields } from '../sign-up.interface';

export interface SignUpSocialFields
	extends Pick<AuthFields, 'username' | 'phoneNumber'> {
	profileImg: string;
}
