import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { FamEntity } from './fam.entity';

@Entity({ name: 'fam_group' })
export class GroupEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty({
		maxLength: 60,
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(60)
	groupName!: string;

	@Column({ type: 'text', nullable: true })
	@ApiPropertyOptional({
		maxLength: 1000,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	@MaxLength(1000)
	groupDescription?: string;

	@OneToMany(() => FamEntity, (fa) => fa.group)
	groupByMemberGroups?: FamEntity[];
}
