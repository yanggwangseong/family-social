import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CreatedAtEntity } from './common/created-at.entity';
import { FeedEntity } from './feed.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_like_feed' })
@Index(['createdAt'])
export class LikeFeedEntity extends CreatedAtEntity {
	@PrimaryColumn('uuid')
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly feedId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberLikesFeeds)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => FeedEntity, (feed) => feed.LikedByMembers)
	@JoinColumn({ name: 'feedId', referencedColumnName: 'id' })
	feed!: FeedEntity;
}
