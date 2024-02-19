import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { FamChatEntity } from './fam-chat.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_message' })
export class FamMessageEntity extends DefaultEntity {
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	@Column({ type: 'text', nullable: false })
	message!: string;

	@ManyToOne(() => FamChatEntity, (chat) => chat.messages)
	chat!: FamChatEntity;

	@ManyToOne(() => MemberEntity, (mb) => mb.messages)
	member!: MemberEntity;
}
