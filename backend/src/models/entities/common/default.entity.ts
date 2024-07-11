import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

import { CreatedAtDecorator } from '@/common/decorators/entity/created-at.decorator';
import { UpdatedAtDecorator } from '@/common/decorators/entity/updated-at.decorator';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

export abstract class DefaultEntity {
	@ApiProperty({
		example: '49fc6eb4-bc34-4de9-85cd-fb0fe66d66a8',
	})
	@PrimaryColumn('uuid')
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	id!: string;

	@CreatedAtDecorator()
	createdAt!: Date;

	@UpdatedAtDecorator()
	updatedAt!: Date;
}
