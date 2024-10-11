import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

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
