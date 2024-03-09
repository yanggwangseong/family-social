import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CommentEntity } from './comment.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_like_comment' })
export class LikeCommentEntity {
	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly commentId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberLikesComments)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => CommentEntity, (cm) => cm.LikedByComments)
	@JoinColumn({ name: 'commentId', referencedColumnName: 'id' })
	comment!: CommentEntity;

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;
}
