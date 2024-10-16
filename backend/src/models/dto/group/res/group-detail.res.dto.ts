import { ApiProperty } from '@nestjs/swagger';

import { FamGroupDetailResDto } from '../../fam/res/fam-group-detail-res.dto';

export class GroupDetailResDto extends FamGroupDetailResDto {
	@ApiProperty({
		nullable: true,
		description: '그룹 팔로워 수',
	})
	followers!: string[];

	@ApiProperty({
		nullable: true,
	})
	followings!: string[];
}
