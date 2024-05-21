import { ApiProperty, PickType } from '@nestjs/swagger';

import { FamEntity } from '@/models/entities/fam.entity';

import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class GroupMembersResDto extends PickType(FamEntity, [
	'id',
	'invitationAccepted',
	'role',
] as const) {
	@ApiProperty({
		nullable: false,
	})
	member!: MemberSearchResDto;
}
