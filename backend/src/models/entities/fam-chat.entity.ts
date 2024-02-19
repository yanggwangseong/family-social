import { Entity, OneToMany } from 'typeorm';

import { DefaultEntity } from './common/default.entity';
import { FamMessageEntity } from './fam-message.entity';

@Entity({ name: 'fam_chat' })
export class FamChatEntity extends DefaultEntity {
	@OneToMany(() => FamMessageEntity, (fm) => fm.chat)
	messages!: FamMessageEntity[];
}
