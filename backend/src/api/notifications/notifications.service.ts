import { Injectable } from '@nestjs/common';

import { NotificationTypeRepository } from '@/models/repositories/notification-type.repository';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';
import { AlarmType, Union } from '@/types';
import { ICreateNotificationArgs } from '@/types/args/notification';
import { getOffset } from '@/utils/getOffset';

@Injectable()
export class NotificationsService {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
		private readonly notificationTypeRepository: NotificationTypeRepository,
	) {}

	async getNotificationByMemberId({
		memberId,
		page,
		limit,
	}: {
		memberId: string;
		page: number;
		limit: number;
	}) {
		const { take, skip } = getOffset({ page, limit });

		return await this.notificationsRepository.getNotifications({
			recipientId: memberId,
			take,
			skip,
		});
	}

	async createNotification(notificationArgs: ICreateNotificationArgs) {
		const { notificationType, ...rest } = notificationArgs;

		const notificationTypeId = await this.findNotificationIdByNotificationType(
			notificationType,
		);

		await this.notificationsRepository.createNotification({
			notificationTypeId,
			...rest,
		});
	}

	async findNotificationIdByNotificationType(
		notificationType: Union<typeof AlarmType>,
	) {
		const { notificationTypeId } =
			await this.notificationTypeRepository.findNotificationTypeId(
				notificationType,
			);

		return notificationTypeId;
	}
}
