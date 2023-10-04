import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'fam_feed' })
export class FeedEntity extends DefaultEntity {
	@Column({ type: 'text', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	contents!: string;

	@Column({ type: 'boolean', nullable: false, default: true })
	@ApiProperty({
		nullable: false,
	})
	isPublic!: boolean;
}
