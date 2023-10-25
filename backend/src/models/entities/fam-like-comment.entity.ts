import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { MemberEntity } from './member.entity';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'fam_like_comment' })
export class LikeCommentEntity {
	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsUUID()
	public readonly commentId!: string;

	@ManyToOne((type) => MemberEntity, (member) => member.memberLikesComments)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne((type) => CommentEntity, (cm) => cm.LikedByComments)
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
