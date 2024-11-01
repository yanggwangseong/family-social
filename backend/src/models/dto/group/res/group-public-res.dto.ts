import { ApiProperty } from '@nestjs/swagger';

import { GroupAccessLevel } from '@/types/enum';

import { GroupProfileResDto } from './group-profile.rest.dto';

export class GroupPublicResDto extends GroupProfileResDto {
	@ApiProperty({
		nullable: false,
		description: '그룹에 속한 멤버 수',
	})
	memberCount!: number;

	@ApiProperty({
		nullable: true,
		description: '그룹 팔로워 수',
		type: String,
	})
	followers!: string[];

	@ApiProperty({
		nullable: true,
		description: '그룹 팔로잉 수',
		type: String,
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
