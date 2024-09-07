import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { FamEntity } from '@/models/entities/fam.entity';

import { GroupProfileResDto } from '../../group/res/group-profile.rest.dto';

export class FamGroupDetailResDto extends PickType(FamEntity, [
	'id',
	'invitationAccepted',
] as const) {
	@ApiProperty({
		nullable: false,
		description: '해당 그룹에 대한 정보',
	})
	@Type(() => GroupProfileResDto)
	group!: GroupProfileResDto;

	@ApiProperty({
		nullable: false,
	})
	memberCount!: number;
}
