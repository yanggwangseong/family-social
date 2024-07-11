import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';

import { booleanValidationMessage } from '@/common/validation-message/boolean-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CommentEntity } from './comment.entity';
import { DefaultEntity } from './common/default.entity';
import { FeedMediaEntity } from './feed-media.entity';
import { GroupEntity } from './group.entity';
import { LikeFeedEntity } from './like-feed.entity';
import { MemberEntity } from './member.entity';
import { MentionEntity } from './mention.entity';

@Entity({ name: 'fam_feed' })
@Index(['createdAt'])
@Index(['updatedAt'])
@Index(['memberId'])
@Index(['groupId'])
export class FeedEntity extends DefaultEntity {
	@Column({ type: 'text', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	contents!: string;

	@IsBoolean({
		message: booleanValidationMessage,
	})
	@Column({ type: 'boolean', nullable: false, default: true })
	@ApiProperty({
		nullable: false,
		example: true,
	})
	isPublic!: boolean;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly groupId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@OneToMany(() => LikeFeedEntity, (lf) => lf.feed)
	LikedByMembers?: LikeFeedEntity[];

	@OneToMany(() => FeedMediaEntity, (fm) => fm.feed)
	medias?: FeedMediaEntity[];

	@ManyToOne(() => GroupEntity, (gr) => gr.feedByGroups)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.memberCreateFeeds)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	// comment
	@OneToMany(() => CommentEntity, (cm) => cm.feed)
	comments?: CommentEntity[];

	// mention
	@OneToMany(() => MentionEntity, (mt) => mt.mentionFeed)
	feedMentions?: MentionEntity[];
}
