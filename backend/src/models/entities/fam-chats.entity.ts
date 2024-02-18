import { Entity } from 'typeorm';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_chats' })
export class FamChatsEntity extends DefaultEntity {}
