import { MemberEntity } from '@/entities/member.entity';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class MemberCreateReqDto extends PickType(MemberEntity, [
	'email',
	'username',
] as const) {
	@ApiPropertyOptional({
		description: '비밀번호',
		example: 'test123',
	})
	password!: string;
}
