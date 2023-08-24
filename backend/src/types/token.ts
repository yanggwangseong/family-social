import { MemberEntity } from '@/entities/member.entity';

export interface TokenPayload extends Pick<MemberEntity, 'id' | 'username'> {}
