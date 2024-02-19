import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

import { FamChatEntity } from './fam-chat.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_member_chat' })
export class FamMemberChatEntity {
	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@PrimaryColumn('uuid')
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsUUID()
	public readonly chatId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberEnterChats)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => FamChatEntity, (chat) => chat.enteredByChats)
	@JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
	chat!: FamChatEntity;

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;
}
