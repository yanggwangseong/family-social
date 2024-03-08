import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

import { ChatEntity } from './chat.entity';
import { DefaultEntity } from './common/default.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_message' })
export class MessageEntity extends DefaultEntity {
	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID()
	public readonly chatId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID()
	public readonly memberId!: string;

	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@Column({ type: 'text', nullable: false })
	message!: string;

	@ManyToOne(() => ChatEntity, (chat) => chat.messages)
	@JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
	chat!: ChatEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.messages)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;
}
