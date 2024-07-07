import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { CreatedAtEntity } from './common/created-at.entity';

@Entity({ name: 'fam_mail_send_log' })
@Index(['createdAt'])
export class MailSendLogEntity extends CreatedAtEntity {
	@ApiProperty()
	@PrimaryColumn('uuid')
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	id!: string;

	@Column({ type: 'varchar', length: 60, nullable: false })
	toEmail!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	mailSubject!: string;

	@Column({
		type: 'boolean',
		nullable: false,
	})
	sendStatus!: boolean;

	@Column({ type: 'varchar', length: 120, nullable: true })
	reasonMessage?: string;
}
