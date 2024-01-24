import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';
import { TourismPeriodEntity } from './tourism-period.entity';

@Entity({ name: 'fam_schedule' })
export class ScheduleEntity extends DefaultEntity {
	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly groupId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@Column({ type: 'varchar', length: 30, nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
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
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(2048)
	scheduleImage?: string;

	@Column({ type: 'date', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	startPeriod!: Date;

	@Column({ type: 'date', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	endPeriod!: Date;

	@ManyToOne(() => GroupEntity, (gr) => gr.schedulesByGroup)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.memberCreateSchedules)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@OneToMany(() => TourismPeriodEntity, (tp) => tp.schedule)
	schdulePeriods!: TourismPeriodEntity[];
}
