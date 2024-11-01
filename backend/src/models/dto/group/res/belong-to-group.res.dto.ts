import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupProfileResDto } from './group-profile.rest.dto';
import { FamWithRoleResDto } from '../../fam/res/fam-with-role-res.dto';

export class BelongToGroupResDto extends FamWithRoleResDto {
	@ApiProperty({
		nullable: false,
		type: [GroupProfileResDto],
	})
	@Type(() => GroupProfileResDto)
	group!: GroupProfileResDto;
}
