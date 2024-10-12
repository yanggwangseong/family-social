import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';

@Entity({ name: 'fam_group_follow' })
@Unique(['followedGroupId', 'followingGroupId'])
@Index(['followedGroupId'])
@Index(['followingGroupId'])
export class GroupFollowEntity extends DefaultEntity {
	@ManyToOne(() => GroupEntity, (group) => group.following, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'followingGroupId' })
	followingGroup!: GroupEntity;

	@ApiProperty({ description: '팔로우 할 그룹 아이디' })
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	@Column({ type: 'uuid', nullable: false })
	followingGroupId!: string;

	@ManyToOne(() => GroupEntity, (group) => group.followers, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'followedGroupId' })
	followedGroup!: GroupEntity;

	@Column({ type: 'uuid', nullable: false })
	followedGroupId!: string;
}
