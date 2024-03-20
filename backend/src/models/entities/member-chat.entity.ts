import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { ChatEntity } from './chat.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_member_chat' })
@Index(['createdAt'])
@Index(['memberId'])
@Index(['chatId'])
export class MemberChatEntity {
	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly chatId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberEnterChats)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => ChatEntity, (chat) => chat.enteredByChats)
	@JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
	chat!: ChatEntity;

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;
}
