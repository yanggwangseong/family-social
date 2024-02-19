import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { FamChatEntity } from './fam-chat.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_message' })
export class FamMessageEntity extends DefaultEntity {
	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly chatId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	@Column({ type: 'text', nullable: false })
	message!: string;

	@ManyToOne(() => FamChatEntity, (chat) => chat.messages)
	@JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
	chat!: FamChatEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.messages)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;
}
