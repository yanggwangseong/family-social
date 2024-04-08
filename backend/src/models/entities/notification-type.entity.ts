import { Column, Entity } from 'typeorm';

import { AlarmType, Union } from '@/types';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_notification_type' })
export class NotificationTypeEntity extends DefaultEntity {
	@Column({
		type: 'enum',
		enum: AlarmType,
	})
	notificationType!: Union<typeof AlarmType>;
}
