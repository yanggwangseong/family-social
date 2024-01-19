import { ApiProperty, PickType } from '@nestjs/swagger';

import { FamEntity } from '@/models/entities/fam.entity';

import { MemberProfileImageResDto } from '../../member/res/member-profile-image-res.dto';

export class GroupMembersResDto extends PickType(FamEntity, [
	'id',
	'invitationAccepted',
	'role',
] as const) {
	@ApiProperty({
		nullable: false,
	})
	member!: MemberProfileImageResDto;
}
