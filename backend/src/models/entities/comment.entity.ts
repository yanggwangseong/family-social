import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { FeedEntity } from './feed.entity';
import { LikeCommentEntity } from './like-comment.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_comment' })
@Index(['createdAt'])
@Index(['updatedAt'])
@Index(['parentId', 'feedId'])
@Index(['memberId'])
export class CommentEntity extends DefaultEntity {
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
	commentContents!: string;

	@ApiPropertyOptional({
		nullable: true,
	})
	@IsOptional()
	@IsUUID(4, { message: uuidValidationMessage })
	@Column('uuid', { nullable: true })
	replyId?: string; // 실제 답글 단 댓글의 uuid

	@ApiPropertyOptional({
		nullable: true,
	})
	@IsOptional()
	@IsUUID(4, { message: uuidValidationMessage })
	@Column('uuid', { nullable: true })
	public readonly parentId?: string; //최초 부모격인 댓글 uuid

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly feedId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@ManyToOne(() => CommentEntity, (comment) => comment.childrenComments)
	@JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
	parent?: CommentEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.memberCreateComments)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => FeedEntity, (fd) => fd.comments)
	@JoinColumn({ name: 'feedId', referencedColumnName: 'id' })
	feed!: FeedEntity;

	@OneToMany(() => CommentEntity, (comment) => comment.parent)
	childrenComments?: CommentEntity[];

	// comment-like
	@OneToMany(() => LikeCommentEntity, (lcm) => lcm.comment)
	LikedByComments?: LikeCommentEntity[];
}
