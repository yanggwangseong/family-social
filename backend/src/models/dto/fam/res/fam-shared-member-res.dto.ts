import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { FamEntity } from '@/models/entities/fam.entity';

import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class FamSharedMemberResDto extends PickType(FamEntity, [
	'id',
	'role',
	'invitationAccepted',
	'memberId',
] as const) {
	@ApiPropertyOptional({
		nullable: false,
	})
	@Type(() => MemberSearchResDto)
	member!: MemberSearchResDto;
}
