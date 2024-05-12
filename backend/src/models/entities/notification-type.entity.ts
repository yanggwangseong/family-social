import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { AlarmType, Union } from '@/types';

import { DefaultEntity } from './common/default.entity';
import { NotificationEntity } from './notification.entity';

@Unique(['notificationType'])
@Entity({ name: 'fam_notification_type' })
export class NotificationTypeEntity extends DefaultEntity {
	@Column({
		type: 'enum',
		enum: AlarmType,
	})
	notificationType!: Union<typeof AlarmType>;

	@OneToMany(() => NotificationEntity, (nt) => nt.notificationType)
	notifications!: NotificationEntity[];
}
