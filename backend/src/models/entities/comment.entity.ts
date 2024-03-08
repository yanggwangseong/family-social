import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

import { DefaultEntity } from './common/default.entity';
import { FeedEntity } from './feed.entity';
import { LikeCommentEntity } from './like-comment.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_comment' })
export class CommentEntity extends DefaultEntity {
	@Column({ type: 'text', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsString({
		message: stringValidationMessage,
	})
	commentContents!: string;

	@ApiPropertyOptional({
		nullable: true,
	})
	@IsOptional()
	@IsUUID()
	@Column('uuid', { nullable: true })
	replyId?: string; // 실제 답글 단 댓글의 uuid

	@ApiPropertyOptional({
		nullable: true,
	})
	@IsOptional()
	@IsUUID()
	@Column('uuid', { nullable: true })
	public readonly parentId?: string; //최초 부모격인 댓글 uuid

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly feedId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
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
