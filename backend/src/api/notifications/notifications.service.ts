import { Injectable } from '@nestjs/common';

import { NotificationTypeRepository } from '@/models/repositories/notification-type.repository';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';
import { ICreateCommentOnMyPostNotificationArgs } from '@/types/args/notification';

@Injectable()
export class NotificationsService {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
		private readonly notificationTypeRepository: NotificationTypeRepository,
	) {}

	async createCommentOnMyPostNotification(
		notificationArgs: ICreateCommentOnMyPostNotificationArgs,
	) {
		const { notificationType, ...rest } = notificationArgs;

		const { notificationTypeId } =
			await this.notificationTypeRepository.findNotificationTypeId(
				notificationType,
			);

		await this.notificationsRepository.createNotification({
			notificationTypeId,
			...rest,
		});
	}
}
