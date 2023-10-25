import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'fam_comment' })
export class CommentEntity extends DefaultEntity {
	@Column({ type: 'text', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
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
}
