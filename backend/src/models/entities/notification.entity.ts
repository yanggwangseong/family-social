import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
} from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { booleanValidationMessage } from '@/common/validation-message/boolean-validation-message';
import { maxLengthValidationMessage } from '@/common/validation-message/max-length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_notification' })
export class NotificationEntity extends DefaultEntity {
	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly notificationTypeId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly recipientId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly senderId!: string;

	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty({
		maxLength: 60,
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(60, { message: maxLengthValidationMessage })
	notificationTitle!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	@ApiProperty({
		maxLength: 60,
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(60, { message: maxLengthValidationMessage })
	notificationDescription!: string;

	@Column({ type: 'uuid', nullable: true })
	@ApiProperty({
		nullable: true,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	notificationFeedId?: string;

	@Column({ type: 'uuid', nullable: true })
	@ApiProperty({
		nullable: true,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	notificationCommentId?: string;

	@Column({ type: 'boolean', nullable: false, default: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsBoolean({
		message: booleanValidationMessage,
	})
	isRead!: boolean;
}
