import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { UpdateDateColumn } from 'typeorm';

export const UpdatedAtDecorator = () => {
	return applyDecorators(
		ApiProperty({
			nullable: false,
			description: '수정 날짜',
			type: String,
		}),
		Transform(({ value }: { value: Date }) => value.toISOString(), {
			toPlainOnly: true,
		}),
		UpdateDateColumn({
			type: 'timestamptz',
			precision: 3,
			default: () => 'CURRENT_TIMESTAMP',
			// onUpdate: 'CURRENT_TIMESTAMP', mysql에서만 작동
		}),
	);
};
