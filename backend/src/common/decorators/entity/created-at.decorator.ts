import { applyDecorators } from '@nestjs/common';
import { CreateDateColumn } from 'typeorm';

import { CreatedAtResDecorator } from './created-at-res.decorator';

export const CreatedAtDecorator = () => {
	return applyDecorators(
		CreatedAtResDecorator(),
		CreateDateColumn({
			type: 'timestamptz',
			precision: 3,
			default: () => 'CURRENT_TIMESTAMP',
		}),
	);
};
