import { ApiProperty, PickType } from '@nestjs/swagger';

import { MemberChatEntity } from '@/models/entities/member-chat.entity';

import { MemberProfileImageResDto } from '../../member/res/member-profile-image-res.dto';

export class ChatMembersResDto extends PickType(MemberChatEntity, [
	'memberId',
]) {
	@ApiProperty({
		nullable: false,
	})
	member!: MemberProfileImageResDto;
}
