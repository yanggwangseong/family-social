import { Entity } from 'typeorm';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_chat' })
export class FamChatsEntity extends DefaultEntity {}
