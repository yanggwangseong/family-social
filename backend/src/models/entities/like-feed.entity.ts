import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { FeedEntity } from './feed.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_like_feed' })
export class LikeFeedEntity {
	@PrimaryColumn('uuid')
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly feedId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberLikesFeeds)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => FeedEntity, (feed) => feed.LikedByMembers)
	@JoinColumn({ name: 'feedId', referencedColumnName: 'id' })
	feed!: FeedEntity;

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;
}