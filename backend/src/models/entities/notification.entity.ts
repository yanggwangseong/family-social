import { Entity } from 'typeorm';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_notification' })
export class NotificationEntity extends DefaultEntity {}
