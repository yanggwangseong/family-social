import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

import { NotificationPaginateResDto } from '@/models/dto/notification/res/notification-paginate-res.dto';
import { NotificationEntity } from '@/models/entities/notification.entity';
import { NotificationTypeRepository } from '@/models/repositories/notification-type.repository';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';
import { AlarmType, Union, isReadOptions } from '@/types';
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
		readOptions,
		page,
		limit,
	}: {
		memberId: string;
		readOptions: Union<typeof isReadOptions>;
		page: number;
		limit: number;
	}): Promise<NotificationPaginateResDto> {
		const { take, skip } = getOffset({ page, limit });

		const whereOverride: FindOptionsWhere<NotificationEntity> = {
			recipientId: memberId,
		};

		if (readOptions === 'READ') {
			whereOverride.isRead = true;
		}

		if (readOptions === 'NOTREAD') {
			whereOverride.isRead = false;
		}

		const [list, count] = await this.notificationsRepository.getNotifications({
			whereOverride,
			take,
			skip,
		});

		return {
			list,
			page,
			totalPage: Math.ceil(count / take),
		};
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
