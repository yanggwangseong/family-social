import { ApiProperty } from '@nestjs/swagger';

import { GroupProfileResDto } from './group-profile.rest.dto';
import { FamResDto } from '../../fam/res/fam-res.dto';

export class BelongToGroupResDto extends FamResDto {
	@ApiProperty({
		nullable: false,
		type: [GroupProfileResDto],
	})
	group!: GroupProfileResDto;
}
