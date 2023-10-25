import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;
}
