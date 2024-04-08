import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

export abstract class DefaultEntity {
	@ApiProperty()
	@PrimaryColumn('uuid')
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	id!: string;

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;

	@ApiProperty()
	@UpdateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
		// onUpdate: 'CURRENT_TIMESTAMP', mysql에서만 작동
	})
	updatedAt!: Date;
}
