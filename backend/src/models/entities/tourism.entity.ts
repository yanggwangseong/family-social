import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { numberValidationMessage } from '@/common/validation-message/number-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { TourismPeriodEntity } from './tourism-period.entity';

@Entity({ name: 'fam_tourism' })
@Index(['createdAt'])
@Index(['updatedAt'])
export class TourismEntity extends DefaultEntity {
	@PrimaryColumn({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	public readonly contentId!: string;

	@Column({ type: 'time', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	stayTime!: Date;

	@Column('varchar', { length: 2048 })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	tourismImage!: string;

	@Column('varchar', { length: 120 })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	title!: string;

	/**
	 * 관광순서 정렬 순서로, 오름차순 정렬된다.
	 */
	@Column('numeric', { name: 'position', default: 0 })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsNumber(
		{},
		{
			message: numberValidationMessage,
		},
	)
	position!: number;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly periodId!: string;

	@ManyToOne(() => TourismPeriodEntity, (tp) => tp.tourisms)
	@JoinColumn({ name: 'periodId', referencedColumnName: 'id' })
	tourismPeriod!: TourismPeriodEntity;
}
