import { ApiProperty } from '@nestjs/swagger';

import { GroupResDto } from './group-res.dto';
import { FamResDto } from '../../fam/res/fam-res.dto';

export class BelongToGroupResDto extends FamResDto {
	@ApiProperty({
		nullable: false,
		type: [GroupResDto],
	})
	group!: GroupResDto;
}
