import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CreateDateColumn } from 'typeorm';

export const CreatedAtDecorator = () => {
	return applyDecorators(
		ApiProperty(),
		Transform(({ value }: { value: Date }) => value.toISOString(), {
			toPlainOnly: true,
		}),
		CreateDateColumn({
			type: 'timestamptz',
			precision: 3,
			default: () => 'CURRENT_TIMESTAMP',
		}),
	);
};
