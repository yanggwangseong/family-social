import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CommentEntity } from './comment.entity';
import { DefaultEntity } from './common/default.entity';
import { FeedEntity } from './feed.entity';
import { MemberEntity } from './member.entity';
import { MentionTypeEntity } from './mention-type.entity';

@Entity({ name: 'fam_mention' })
@Index(['mentionFeedId'])
@Index(['mentionCommentId'])
@Index(['mentionTypeId'])
export class MentionEntity extends DefaultEntity {
	@Column({ type: 'uuid', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly mentionRecipientId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly mentionSenderId!: string;

	@Column({ type: 'uuid', nullable: true })
	@ApiProperty({
		nullable: true,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly mentionCommentId?: string;

	@Column({ type: 'uuid', nullable: true })
	@ApiProperty({
		nullable: true,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly mentionFeedId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly mentionTypeId!: string;

	@ManyToOne(() => MentionTypeEntity, (mt) => mt.mentions)
	@JoinColumn({ name: 'mentionTypeId', referencedColumnName: 'id' })
	mentionType!: MentionTypeEntity;

	@ManyToOne(() => MemberEntity, (mt) => mt.recipientMentions)
	@JoinColumn({ name: 'mentionRecipientId', referencedColumnName: 'id' })
	mentionRecipient!: MemberEntity;

	@ManyToOne(() => MemberEntity, (mt) => mt.senderMentions)
	@JoinColumn({ name: 'mentionSenderId', referencedColumnName: 'id' })
	mentionSender!: MemberEntity;

	@ManyToOne(() => FeedEntity, (mt) => mt.feedMentions)
	@JoinColumn({ name: 'mentionFeedId', referencedColumnName: 'id' })
	mentionFeed!: FeedEntity;

	@ManyToOne(() => CommentEntity, (mt) => mt.commentMentions)
	@JoinColumn({ name: 'mentionCommentId', referencedColumnName: 'id' })
	mentionComment!: CommentEntity;
}
