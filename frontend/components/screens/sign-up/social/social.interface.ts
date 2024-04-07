import { Union, selectedProfileType } from 'types';
import { AuthFields } from '../sign-up.interface';

export interface SignUpSocialFields
	extends Pick<AuthFields, 'username' | 'phoneNumber'> {
	profileImg: string;
}

export type ProfileImgType = Union<typeof selectedProfileType>;
