import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';
import { TourismPeriodEntity } from './tourism-period.entity';

@Entity({ name: 'fam_schedule' })
export class ScheduleEntity extends DefaultEntity {
	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly groupId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@Column({ type: 'varchar', length: 30, nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(30)
	scheduleName!: string;

	/**
	 * 서버를 통해 한 번 전처리된 이미지
	 * example is @link {https://folder/test.jpg}
	 *
	 * @minLength 4
	 * @maxLength 2048
	 */
	@Column('varchar', { length: 2048, nullable: true })
	@ApiPropertyOptional()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MinLength(4)
	@MaxLength(2048)
	scheduleImage?: string;

	@Column({ type: 'date', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	startPeriod!: Date;

	@Column({ type: 'date', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	endPeriod!: Date;

	@ManyToOne(() => GroupEntity, (gr) => gr.schedulesByGroup)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.memberCreateSchedules)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@OneToMany(() => TourismPeriodEntity, (tp) => tp.schedule)
	schedulePeriods!: TourismPeriodEntity[];
}
