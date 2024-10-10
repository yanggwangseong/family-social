import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { ChatType, Union } from '@/types';

import { ChatEntity } from './chat.entity';
import { CreatedUpdatedAtEntity } from './common/created-updated-at.entity';

@Entity({ name: 'fam_chat_type' })
export class ChatTypeEntity extends CreatedUpdatedAtEntity {
	@PrimaryColumn({
		type: 'varchar',
		length: 50,
	})
	chatType!: Union<typeof ChatType>;

	@OneToMany(() => ChatEntity, (chat) => chat.chatType)
	chats!: ChatEntity[];
}
