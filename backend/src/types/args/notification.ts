import { NotificationEntity } from '@/models/entities/notification.entity';

import { AlarmType, Union } from '../index';

export interface ICreateCommentOnMyPostNotificationArgs
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
