import { LocalDateTime } from '@js-joda/core';
import { Transform } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { ConverDateTime } from '@/utils/convert-date-time';

import { LocalDateTimeTransformer } from '../transformer/local-date-time.transformer';

@Entity({ name: 'test' })
export class TestEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		name: 'content',
		type: 'text',
	})
	content!: string;

	@Column({
		type: 'timestamptz',
		transformer: new LocalDateTimeTransformer(),
		nullable: true,
	})
	orderDateTime!: LocalDateTime;

	@Transform(
		({ value }: { value: Date }) => {
			console.log('*******호출!!!******');
			return value.toISOString();
		},
		{
			toPlainOnly: true,
		},
	)
	@CreateDateColumn({
		type: 'timestamptz',
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
	})
	updatedAt!: Date;

	get CreatedAt() {
		return ConverDateTime.toLocalDateTime(this.createdAt);
	}

	get UpdatedAt() {
		return ConverDateTime.toLocalDateTime(this.updatedAt);
	}
}
