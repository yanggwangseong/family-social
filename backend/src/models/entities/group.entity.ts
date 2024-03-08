import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

import { DefaultEntity } from './common/default.entity';
import { FamEntity } from './fam.entity';
import { FeedEntity } from './feed.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'fam_group' })
export class GroupEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty({
		maxLength: 60,
		nullable: false,
	})
	@IsNotEmpty()
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(60)
	groupName!: string;

	@Column({ type: 'text', nullable: true })
	@ApiPropertyOptional({
		maxLength: 1000,
		nullable: true,
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(1000)
	groupDescription?: string;

	@OneToMany(() => FamEntity, (fa) => fa.group)
	groupByMemberGroups?: FamEntity[];

	@OneToMany(() => FeedEntity, (fd) => fd.group)
	feedByGroups?: FeedEntity[];

	@OneToMany(() => ScheduleEntity, (sc) => sc.group)
	schedulesByGroup?: ScheduleEntity[];
}
