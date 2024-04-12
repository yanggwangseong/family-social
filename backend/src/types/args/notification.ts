import { NotificationEntity } from '@/models/entities/notification.entity';

import { AlarmType, Union } from '../index';

export interface ICreateNotificationArgs
	extends Pick<
		NotificationEntity,
		| 'recipientId'
		| 'senderId'
		| 'notificationTitle'
		| 'notificationDescription'
		| 'notificationFeedId'
	> {
	notificationType: Union<typeof AlarmType>;
}
