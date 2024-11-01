import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupAccessLevel } from '@/types/enum';

import { GroupProfileResDto } from './group-profile.rest.dto';
import { FamWithRoleResDto } from '../../fam/res/fam-with-role-res.dto';

export class GroupAccessLevelResDto extends FamWithRoleResDto {
	@ApiProperty({
		nullable: false,
		description: '해당 그룹에 대한 정보',
	})
	@Type(() => GroupProfileResDto)
	group!: GroupProfileResDto;

	@ApiProperty({
		nullable: false,
		description: '그룹에 속한 멤버 수',
	})
	memberCount!: number;

	@ApiProperty({
		nullable: true,
		description: '그룹 팔로워 수',
	})
	followers!: string[];

	@ApiProperty({
		nullable: true,
		description: '그룹 팔로잉 수',
	})
	followings!: string[];

	@ApiProperty({
		nullable: false,
		description: '그룹 접근 수준',
		enum: GroupAccessLevel,
		enumName: 'GroupAccessLevel',
	})
	accessLevel!: GroupAccessLevel;
}
