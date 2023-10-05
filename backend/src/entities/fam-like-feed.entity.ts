import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { MemberEntity } from './member.entity';
import { FeedEntity } from './feed.entity';

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

	@ManyToOne((type) => MemberEntity, (member) => member.memberLikesFeeds)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne((type) => FeedEntity, (feed) => feed.LikedByMembers)
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
