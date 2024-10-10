import { Column, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';

@Unique(['followerId', 'followingId'])
@Index(['followerId'])
@Index(['followingId'])
export class GroupFollowEntity extends DefaultEntity {
	@ManyToOne(() => GroupEntity, (group) => group.following, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'followingGroupId' })
	followingGroup!: GroupEntity;

	@Column({ type: 'uuid' })
	followingGroupId!: string;

	@ManyToOne(() => GroupEntity, (group) => group.followers, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'followedGroupId' })
	followedGroup!: GroupEntity;

	@Column({ type: 'uuid' })
	followedGroupId!: string;
}
