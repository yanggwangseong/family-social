import { MemberEntity } from '@/models/entities/member.entity';

export interface TokenPayload extends Pick<MemberEntity, 'username'> {
	sub: string;
}

export interface IRefreshTokenArgs extends Pick<MemberEntity, 'username'> {
	sub: string;
	refreshToken: string;
}
