import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

import { MentionEntity } from '@/models/entities/mention.entity';

import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class MentionResDto extends PickType(MentionEntity, [
	'id',
	'mentionPosition',
] as const) {
	@ApiPropertyOptional({
		nullable: false,
	})
	mentionRecipient!: MemberSearchResDto;
}
