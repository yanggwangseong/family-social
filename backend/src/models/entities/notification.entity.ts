import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
} from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { booleanValidationMessage } from '@/common/validation-message/boolean-validation-message';
import { maxLengthValidationMessage } from '@/common/validation-message/max-length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { MemberEntity } from './member.entity';
import { NotificationTypeEntity } from './notification-type.entity';

@Entity({ name: 'fam_notification' })
@Index(['isRead'])
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

	@ManyToOne(() => NotificationTypeEntity, (nft) => nft.notifications)
	@JoinColumn({ name: 'notificationTypeId', referencedColumnName: 'id' })
	notificationType!: NotificationTypeEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.recipientNotifications)
	@JoinColumn({ name: 'recipientId', referencedColumnName: 'id' })
	recipient!: MemberEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.senderIdNotifications)
	@JoinColumn({ name: 'senderId', referencedColumnName: 'id' })
	sender!: MemberEntity;

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
