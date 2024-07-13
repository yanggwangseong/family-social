import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MaxLength,
} from 'class-validator';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { lengthValidationMessage } from '@/common/validation-message/length-validation-message';
import { maxLengthValidationMessage } from '@/common/validation-message/max-length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

import { DefaultEntity } from './common/default.entity';
import { FamEntity } from './fam.entity';
import { FeedEntity } from './feed.entity';
import { GroupEventEntity } from './group-event.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'fam_group' })
@Index(['createdAt'])
@Index(['updatedAt'])
export class GroupEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty({
		maxLength: 60,
		nullable: false,
		description: '그룹 이름',
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(60, { message: maxLengthValidationMessage })
	groupName!: string;

	@Column({ type: 'text', nullable: true })
	@ApiPropertyOptional({
		maxLength: 1000,
		nullable: true,
		description: '그룹 설명',
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(1000, { message: maxLengthValidationMessage })
	groupDescription?: string;

	/**
	 * 서버를 통해 한 번 전처리된 이미지
	 * example is @link {https://folder/test.jpg}
	 *
	 * @minLength 4
	 * @maxLength 2048
	 */
	@Column('varchar', { length: 2048, nullable: true })
	@ApiProperty({
		description: '그룹 커버 이미지',
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@Length(4, 2048, { message: lengthValidationMessage })
	groupCoverImage!: string;

	@OneToMany(() => FamEntity, (fa) => fa.group)
	groupByMemberGroups?: FamEntity[];

	@OneToMany(() => FeedEntity, (fd) => fd.group)
	feedByGroups?: FeedEntity[];

	@OneToMany(() => ScheduleEntity, (sc) => sc.group)
	schedulesByGroup?: ScheduleEntity[];

	// group event
	@OneToMany(() => GroupEventEntity, (ev) => ev.eventGroup)
	eventByGroups?: GroupEventEntity[];
}
