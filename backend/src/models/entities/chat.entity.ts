import { Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';
import { MemberChatEntity } from './member-chat.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'fam_chat' })
@Index(['createdAt'])
@Index(['updatedAt'])
export class ChatEntity extends DefaultEntity {
	@OneToMany(() => MessageEntity, (fm) => fm.chat)
	messages!: MessageEntity[];

	@OneToMany(() => MemberChatEntity, (fmc) => fmc.chat)
	enteredByChats!: MemberChatEntity[];

	@ManyToOne(() => GroupEntity, (group) => group.chats, { nullable: true })
	group?: GroupEntity;
}
