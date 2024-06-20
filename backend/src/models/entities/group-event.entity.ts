import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsIn,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	MaxLength,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { lengthValidationMessage } from '@/common/validation-message/length-validation-message';
import { maxLengthValidationMessage } from '@/common/validation-message/max-length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { EventType, Union } from '@/types';

import { DefaultEntity } from './common/default.entity';
import { GroupEventTypeEntity } from './group-event-type.entity';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_group_event' })
export class GroupEventEntity extends DefaultEntity {
	@PrimaryColumn({
		type: 'varchar',
		length: 50,
	})
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsIn(EventType, { message: isInValidationMessage })
	public readonly eventType!: Union<typeof EventType>;

	@PrimaryColumn('uuid')
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly eventGroupId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly eventOrganizerId!: string;

	/**
	 * 서버를 통해 한 번 전처리된 이미지
	 * example is @link {https://folder/test.jpg}
	 *
	 * @minLength 4
	 * @maxLength 2048
	 */
	@Column('varchar', { length: 2048, nullable: true })
	@ApiPropertyOptional()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@Length(4, 2048, { message: lengthValidationMessage })
	eventCoverImage!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(100, { message: maxLengthValidationMessage })
	eventName!: string;

	@Column({ type: 'text', nullable: true })
	@ApiPropertyOptional({
		nullable: true,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	eventDescription!: string;

	@Column({ type: 'date', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	eventStartDate!: Date;

	@Column({ type: 'time', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	eventStartTime!: Date;

	@Column({ type: 'date', nullable: true })
	@IsOptional()
	@ApiPropertyOptional()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	eventEndDate?: Date;

	@Column({ type: 'time', nullable: true })
	@IsOptional()
	@ApiPropertyOptional()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	eventEndTime?: Date;

	@ManyToOne(() => GroupEventTypeEntity, (evt) => evt.groupEvents)
	@JoinColumn({ name: 'eventType', referencedColumnName: 'groupEventType' })
	groupEventType!: GroupEventTypeEntity;

	@ManyToOne(() => GroupEntity, (gp) => gp.eventByGroups)
	@JoinColumn({ name: 'eventGroupId', referencedColumnName: 'id' })
	eventGroup!: GroupEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.organizerByGroups)
	@JoinColumn({ name: 'eventOrganizerId', referencedColumnName: 'id' })
	eventOrganizer!: MemberEntity;
}
