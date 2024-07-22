import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CreatedAtEntity } from './common/created-at.entity';
import { FamEntity } from './fam.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'fam_shared_schedule_member' })
export class SharedScheduleMemberEntity extends CreatedAtEntity {
	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly sharedScheduleId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly sharedFamId!: string;

	@ManyToOne(() => ScheduleEntity, (sc) => sc.sharedMembers)
	@JoinColumn({ name: 'sharedScheduleId', referencedColumnName: 'id' })
	sharedSchedule!: ScheduleEntity;

	@ManyToOne(() => FamEntity, (fm) => fm.sharedMembers)
	@JoinColumn({ name: 'sharedFamId', referencedColumnName: 'id' })
	sharedMember!: FamEntity;
}
