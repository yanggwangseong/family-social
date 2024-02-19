import { Entity, OneToMany } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { FamMemberChatEntity } from './fam-member-chat.entity';
import { FamMessageEntity } from './fam-message.entity';

@Entity({ name: 'fam_chat' })
export class FamChatEntity extends DefaultEntity {
	@OneToMany(() => FamMessageEntity, (fm) => fm.chat)
	messages!: FamMessageEntity[];

	@OneToMany(() => FamMemberChatEntity, (fmc) => fmc.chat)
	enteredByChats!: FamMemberChatEntity[];
}
