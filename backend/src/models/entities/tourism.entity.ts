import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { TourismPeriodEntity } from './tourism-period.entity';

@Entity({ name: 'fam_tourism' })
export class TourismEntity extends DefaultEntity {
	@PrimaryColumn({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsUUID()
	public readonly contentId!: string;

	@Column({ type: 'time', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	stayTime!: Date;

	@Column('varchar', { length: 2048 })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	tourismImage!: string;

	@Column('varchar', { length: 120 })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	title!: string;

	/**
	 * 관광순서 정렬 순서로, 오름차순 정렬된다.
	 */
	@Column('numeric', { name: 'position', default: 0 })
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	position!: number;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly periodId!: string;

	@ManyToOne(() => TourismPeriodEntity, (tp) => tp.tourisms)
	@JoinColumn({ name: 'periodId', referencedColumnName: 'id' })
	tourismPeriod!: TourismPeriodEntity;
}
