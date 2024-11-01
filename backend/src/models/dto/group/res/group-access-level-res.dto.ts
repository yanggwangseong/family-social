import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupAccessLevel } from '@/types/enum';

import { GroupProfileResDto } from './group-profile.rest.dto';
import { FamWithRoleResDto } from '../../fam/res/fam-with-role-res.dto';
import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class GroupAccessLevelResDto extends GroupProfileResDto {
	@ApiProperty({
		nullable: true,
		description: '그룹 멤버에 대한 정보',
		type: FamWithRoleResDto,
	})
	@Type(() => FamWithRoleResDto)
	fam!: FamWithRoleResDto;

	@ApiProperty({
		nullable: true,
		description: '사용자에 대한 정보',
		type: MemberSearchResDto,
	})
	@Type(() => MemberSearchResDto)
	member!: MemberSearchResDto;

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
