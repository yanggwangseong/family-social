import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { ScheduleEntity } from './schedule.entity';
import { TourismEntity } from './tourism.entity';

@Entity({ name: 'fam_tourism_period' })
@Index(['createdAt'])
@Index(['updatedAt'])
@Index(['scheduleId'])
export class TourismPeriodEntity extends DefaultEntity {
	@Column({ type: 'date', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	period!: Date;

	@Column({ type: 'time', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	startTime!: Date;

	@Column({ type: 'time', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	endTime!: Date;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly scheduleId!: string;

	@ManyToOne(() => ScheduleEntity, (sch) => sch.schedulePeriods)
	@JoinColumn({ name: 'scheduleId', referencedColumnName: 'id' })
	schedule!: ScheduleEntity;

	@OneToMany(() => TourismEntity, (trs) => trs.tourismPeriod)
	tourisms!: TourismEntity[];
}
