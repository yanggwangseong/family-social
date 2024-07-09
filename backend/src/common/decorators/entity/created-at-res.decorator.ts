import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export const CreatedAtResDecorator = () => {
	return applyDecorators(
		ApiProperty({
			nullable: false,
		}),
		Transform(({ value }: { value: Date }) => value.toISOString(), {
			toPlainOnly: true,
		}),
	);
};
