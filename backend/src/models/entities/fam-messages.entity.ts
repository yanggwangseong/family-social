import { Entity } from 'typeorm';
import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_message' })
export class FamMessagesEntity extends DefaultEntity {}
