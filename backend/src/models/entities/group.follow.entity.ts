import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	Unique,
} from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CreatedUpdatedAtEntity } from './common/created-updated-at.entity';
import { GroupEntity } from './group.entity';

@Entity({ name: 'fam_group_follow' })
@Unique(['followedGroupId', 'followingGroupId'])
@Index(['followedGroupId'])
@Index(['followingGroupId'])
export class GroupFollowEntity extends CreatedUpdatedAtEntity {
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
	@PrimaryColumn({ type: 'uuid', nullable: false })
	followingGroupId!: string;

	@ManyToOne(() => GroupEntity, (group) => group.followers, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'followedGroupId' })
	followedGroup!: GroupEntity;

	@PrimaryColumn({ type: 'uuid', nullable: false })
	followedGroupId!: string;
}
